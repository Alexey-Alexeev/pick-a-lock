"use client";

import {
  TextField as AriaTextField,
  Label,
  Input,
  TextArea,
  FieldError,
  type TextFieldProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

const fieldClasses =
  "h-12 border border-border bg-paper px-4 text-sm text-foreground outline-none placeholder:text-muted transition-colors hover:border-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent";

interface Props extends Omit<TextFieldProps, "className"> {
  label: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

export function Field({ label, placeholder, multiline, rows = 3, className, ...props }: Props) {
  return (
    <AriaTextField
      validationBehavior="native"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      <Label className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{label}</Label>
      {multiline ? (
        <TextArea placeholder={placeholder} rows={rows} className={cn(fieldClasses, "h-auto resize-none py-3")} />
      ) : (
        <Input placeholder={placeholder} className={fieldClasses} />
      )}
      <FieldError className="text-[13px] text-red-700" />
    </AriaTextField>
  );
}
