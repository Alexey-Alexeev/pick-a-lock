"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface TypewriterLineProps {
  phrases: string[];
  className?: string;
}

/** Types each phrase out, pauses, deletes it, then moves to the next — loops forever. */
export function TypewriterLine({ phrases, className }: TypewriterLineProps) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const current = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 45);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), 1700);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 25);
      } else {
        timeout = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % phrases.length);
          setPhase("typing");
        }, 300);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, phraseIndex, phrases, reducedMotion]);

  if (reducedMotion) {
    return <span className={className}>{phrases.join(" / ")}</span>;
  }

  return (
    <span className={cn(className, "inline-flex items-center")}>
      {text}
      <span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-px animate-pulse bg-current align-middle" />
    </span>
  );
}
