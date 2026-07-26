import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AssistantInput = z.object({
  education: z.string().optional().default(""),
  skills: z.string().optional().default(""),
  experience: z.string().optional().default(""),
  goal: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

const CoverLetterInput = z.object({
  jobTitle: z.string().min(1),
  company: z.string().min(1),
  jobDescription: z.string().optional().default(""),
  name: z.string().optional().default(""),
  skills: z.string().optional().default(""),
  experience: z.string().optional().default(""),
});

const InterviewInput = z.object({
  role: z.string().min(1),
  level: z.string().optional().default("entry"),
  focus: z.string().optional().default(""),
});

const RoadmapInput = z.object({
  goal: z.string().min(1),
  currentLevel: z.string().optional().default(""),
  timeframe: z.string().optional().default("6 months"),
});

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3.6-flash";

async function callAI(system: string, user: string) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const resp = await fetch(GATEWAY, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (resp.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
  if (resp.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`AI gateway error (${resp.status}): ${text.slice(0, 200)}`);
  }
  const json = (await resp.json()) as { choices?: { message?: { content?: string } }[] };
  return json.choices?.[0]?.message?.content ?? "";
}

const ADVISOR_SYSTEM = `You are CareerNova AI, a warm and pragmatic career coach for students, fresh graduates, and professionals worldwide.
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
    const user = `Education: ${data.education || "not provided"}
Skills: ${data.skills || "not provided"}
Experience: ${data.experience || "not provided"}
Career Goal: ${data.goal || "not provided"}
${data.message ? `\nAdditional context: ${data.message}` : ""}`;
    const content = await callAI(ADVISOR_SYSTEM, user);
    return { content };
  });

export const generateCoverLetter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => CoverLetterInput.parse(data))
  .handler(async ({ data }) => {
    const system = `You are an expert career writer. Write a compelling, personalized cover letter in about 250-320 words. Use markdown, keep tone warm and confident, and structure with: greeting, 3 short paragraphs (hook + fit, achievements + impact, motivation + close), and a sign-off. Never invent employer facts.`;
    const user = `Candidate name: ${data.name || "Applicant"}
Applying for: ${data.jobTitle} at ${data.company}
Skills: ${data.skills || "not provided"}
Experience: ${data.experience || "not provided"}
Job description / context: ${data.jobDescription || "not provided"}`;
    const content = await callAI(system, user);
    return { content };
  });

export const generateInterviewQuestions = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InterviewInput.parse(data))
  .handler(async ({ data }) => {
    const system = `You are an interview coach. Given a target role, produce a realistic mock interview using markdown:

## Behavioral (5)
- 5 questions with a one-line STAR hint each

## Technical / Role-specific (5)
- 5 questions with a short sample-answer outline

## Final Tips
- 3 crisp tips tailored to the role

Keep every answer outline under 40 words. Be concrete.`;
    const user = `Target role: ${data.role}
Level: ${data.level}
Focus area: ${data.focus || "general"}`;
    const content = await callAI(system, user);
    return { content };
  });

export const generateRoadmap = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => RoadmapInput.parse(data))
  .handler(async ({ data }) => {
    const system = `You are a career roadmap planner. Build a phased plan in markdown:

## Overview
2-3 sentences summarising the plan.

## Phase 1 — Foundations
- 4-6 concrete actions (each: skill / resource / outcome)

## Phase 2 — Build
- 4-6 concrete actions incl. projects to ship

## Phase 3 — Apply & Grow
- 4-6 actions incl. portfolio, applications, community

## Weekly Rhythm
- Bullet list of what a typical week looks like

## Milestones
- Measurable checkpoints tied to the timeframe

Bullets tight (max ~16 words). Prefer free/known resources.`;
    const user = `Career goal: ${data.goal}
Current level: ${data.currentLevel || "not provided"}
Timeframe: ${data.timeframe}`;
    const content = await callAI(system, user);
    return { content };
  });
