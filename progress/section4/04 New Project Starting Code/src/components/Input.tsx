import { ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ id, label, ...props }: InputProps) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </p>
  );
}
