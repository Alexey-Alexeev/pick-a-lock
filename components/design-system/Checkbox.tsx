"use client";

import { Checkbox as AriaCheckbox, type CheckboxProps } from "react-aria-components";
import type { ReactNode } from "react";
import { CheckIcon } from "./icons";
import { cn } from "@/lib/utils";

interface Props extends Omit<CheckboxProps, "children"> {
  children: ReactNode;
}

export function Checkbox({ className, children, ...props }: Props) {
  return (
    <AriaCheckbox
      className={cn(
        "group flex cursor-pointer items-start gap-3 text-[12px] leading-relaxed text-muted",
        className
      )}
      {...props}
    >
      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-foreground/30 bg-transparent transition-colors group-data-[selected]:border-accent group-data-[selected]:bg-accent group-data-[focus-visible]:outline-none group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-accent group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-paper group-data-[invalid]:border-red-700">
        <CheckIcon className="h-3 w-3 text-accent-foreground opacity-0 group-data-[selected]:opacity-100" />
      </div>
      <span>{children}</span>
    </AriaCheckbox>
  );
}
