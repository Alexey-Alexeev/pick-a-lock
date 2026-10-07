"use client";

import { Field } from "./TextField";
import type { TextFieldProps } from "react-aria-components";

export function PhoneInput(props: Omit<TextFieldProps, "className">) {
  return (
    <Field
      label="Телефон"
      placeholder="+7 (___) ___-__-__"
      type="tel"
      name="phone"
      isRequired
      minLength={10}
      {...props}
    />
  );
}
