"use client";

import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./buttonVariants";
import { cn } from "@/lib/utils";

export interface ButtonProps extends AriaButtonProps, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <AriaButton className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
