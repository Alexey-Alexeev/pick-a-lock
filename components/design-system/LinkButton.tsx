import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonVariants } from "./buttonVariants";
import type { ButtonProps } from "./Button";
import { cn } from "@/lib/utils";

interface LinkButtonProps
  extends ComponentProps<typeof Link>,
    Pick<ButtonProps, "variant" | "size"> {}

export function LinkButton({ className, variant, size, ...props }: LinkButtonProps) {
  return <Link className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
