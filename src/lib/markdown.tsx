import type { ReactElement } from "react";

export function renderMarkdown(md: string): ReactElement {
  const lines = md.split("\n");
  const out: ReactElement[] = [];
  let list: string[] = [];
  const flushList = () => {
    if (list.length) {
      out.push(
        <ul key={`ul-${out.length}`} className="ml-4 list-disc space-y-1 text-sm text-foreground/90">
          {list.map((li, i) => <li key={i}>{li}</li>)}
        </ul>,
      );
      list = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      flushList();
      out.push(
        <h3 key={`h-${out.length}`} className="mt-3 font-display text-base font-bold text-foreground">
          {line.slice(3)}
        </h3>,
      );
    } else if (/^[-*]\s+/.test(line)) {
      list.push(line.replace(/^[-*]\s+/, ""));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      out.push(
        <p key={`p-${out.length}`} className="text-sm leading-relaxed text-foreground/90">
          {line}
        </p>,
      );
    }
  }
  flushList();
  return <div className="flex flex-col gap-1">{out}</div>;
}
