"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ProcessStep {
  title?: string;
  description: string;
}

const STEP_DWELL = 1700; // ms a step stays active before the line starts travelling to the next
const LINE_TRAVEL = 650; // ms for the connector to fill — keep in sync with .step-connector transition
const END_PAUSE = 1300; // ms pause on the final step before the loop resets
const RESET_FADE = 350; // ms fade used to make the loop restart feel seamless, not a hard cut

export function Process({ steps }: { steps: ProcessStep[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isIn, setIsIn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filledConnectors, setFilledConnectors] = useState<boolean[]>(() => steps.map(() => false));
  const [resetting, setResetting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIn || reducedMotion || steps.length === 0) return;

    function clear() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    function runStep(i: number) {
      setActiveIndex(i);
      timeoutRef.current = setTimeout(() => {
        if (i < steps.length - 1) {
          setFilledConnectors((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
          timeoutRef.current = setTimeout(() => runStep(i + 1), LINE_TRAVEL);
        } else {
          timeoutRef.current = setTimeout(() => {
            setResetting(true);
            timeoutRef.current = setTimeout(() => {
              setFilledConnectors(steps.map(() => false));
              setActiveIndex(0);
              setResetting(false);
              runStep(0);
            }, RESET_FADE);
          }, END_PAUSE);
        }
      }, STEP_DWELL);
    }

    runStep(0);
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIn, reducedMotion]);

  return (
    <div ref={rootRef} className={isIn ? "is-in" : undefined}>
      <div
        className="flex flex-col transition-opacity duration-300 ease-out sm:flex-row"
        style={{ opacity: resetting ? 0 : 1 }}
      >
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const reached = reducedMotion || i <= activeIndex;
          const active = i === activeIndex;
          return (
            <div key={i} className="flex sm:flex-1 sm:flex-col">
              {/* Mobile: vertical rail to the left of the badge. Desktop: horizontal rail above the step. */}
              <div className="flex flex-col items-center self-stretch sm:w-full sm:flex-row sm:self-auto">
                <span
                  className={`step-circle rise relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent ${
                    active ? "is-active" : ""
                  }`}
                  style={{ "--d": "0ms" } as React.CSSProperties}
                >
                  <span
                    className={`step-fill absolute inset-0 rounded-full bg-accent-ink ${reached ? "is-filled" : ""}`}
                    aria-hidden="true"
                  />
                  <span className={`step-number font-display text-sm ${reached ? "is-filled" : ""}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                {!isLast && (
                  <>
                    {/* vertical connector (mobile) — flex-1 so it fills the full gap down to the next
                        circle, matching the height of this step's (taller) content beside it */}
                    <span className="my-1 w-px flex-1 bg-border sm:hidden" aria-hidden="true">
                      <span
                        className={`step-connector--vertical block h-full w-full bg-accent-ink ${
                          filledConnectors[i] || reducedMotion ? "is-filled" : ""
                        }`}
                      />
                    </span>
                    {/* horizontal connector (desktop) */}
                    <span className="hidden h-px flex-1 bg-border sm:ml-3 sm:block" aria-hidden="true">
                      <span
                        className={`step-connector block h-full w-full bg-accent-ink ${
                          filledConnectors[i] || reducedMotion ? "is-filled" : ""
                        }`}
                      />
                    </span>
                  </>
                )}
              </div>

              <div
                className={`rise ml-[52px] flex flex-1 flex-col gap-2 pb-8 pl-4 pt-3 sm:ml-0 sm:gap-3 sm:px-6 sm:pb-0 sm:pl-0 sm:pt-4 ${
                  isLast ? "" : "sm:border-r sm:border-border"
                }`}
                style={{ "--d": "0ms" } as React.CSSProperties}
              >
                {step.title && (
                  <span
                    className={`step-text text-sm font-semibold uppercase tracking-[0.02em] ${
                      active || reducedMotion ? "is-active" : ""
                    }`}
                  >
                    {step.title}
                  </span>
                )}
                <p
                  className={`step-text text-sm leading-relaxed ${
                    active || reducedMotion ? "is-active" : ""
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
