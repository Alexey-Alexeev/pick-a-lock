"use client";

import {
  Select as AriaSelect,
  SelectValue,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
  Label,
  type SelectProps as AriaSelectProps,
} from "react-aria-components";
import { ChevronDownIcon, CheckIcon } from "./icons";
import { cn } from "@/lib/utils";

export interface SelectOption {
  id: string;
  label: string;
}

interface SelectProps extends Omit<AriaSelectProps<SelectOption>, "children"> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({ label, options, placeholder, className, ...props }: SelectProps) {
  return (
    <AriaSelect className={cn("flex flex-col gap-1.5", className)} {...props}>
      <Label className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{label}</Label>
      <Button className="flex h-12 items-center justify-between gap-2 border border-border bg-paper px-4 text-left text-sm text-foreground outline-none transition-colors hover:border-foreground/30 data-[focus-visible]:border-accent data-[focus-visible]:ring-1 data-[focus-visible]:ring-accent">
        <SelectValue className="truncate">
          {({ selectedText }) => selectedText || placeholder}
        </SelectValue>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted" />
      </Button>
      <Popover className="w-(--trigger-width) border border-border bg-surface">
        <ListBox className="max-h-72 overflow-auto p-1 outline-none">
          {options.map((option) => (
            <ListBoxItem
              key={option.id}
              id={option.id}
              textValue={option.label}
              className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2.5 text-sm text-foreground outline-none data-[focused]:bg-surface-sunken data-[selected]:text-accent"
            >
              {({ isSelected }) => (
                <>
                  <span>{option.label}</span>
                  {isSelected && <CheckIcon className="h-3.5 w-3.5 shrink-0" />}
                </>
              )}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
