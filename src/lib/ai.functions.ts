import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AssistantInput = z.object({
  education: z.string().optional().default(""),
  skills: z.string().optional().default(""),
  experience: z.string().optional().default(""),
  goal: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

const SYSTEM_PROMPT = `You are CareerNova AI, a warm and pragmatic career coach for students, fresh graduates, and professionals worldwide.
You help users discover jobs, internships, scholarships, and remote opportunities, and give concrete career guidance.
Always respond in this exact structure using short markdown sections:

## Best Jobs
- 3 concrete, realistic roles tailored to the user

## Best Internships
- 3 concrete internship types or programs

## Best Scholarships
- 2-3 scholarship suggestions relevant to their level and region if known

## Skills to Learn Next
- 4-6 prioritized, specific skills with a one-line reason

## Career Advice
2-4 sentences of grounded, encouraging advice.

Keep bullets tight (max ~14 words). Never mention that you are an AI model.`;

export const askCareerAI = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => AssistantInput.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const userContent = `Education: ${data.education || "not provided"}
Skills: ${data.skills || "not provided"}
Experience: ${data.experience || "not provided"}
Career Goal: ${data.goal || "not provided"}
${data.message ? `\nAdditional context: ${data.message}` : ""}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (resp.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
    if (resp.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`AI gateway error (${resp.status}): ${text.slice(0, 200)}`);
    }

    const json = (await resp.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
