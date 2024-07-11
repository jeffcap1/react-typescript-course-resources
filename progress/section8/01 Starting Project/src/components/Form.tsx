import { type ComponentPropsWithRef, useRef } from "react";

type FormProps = ComponentPropsWithRef<"form"> & {
  onSave: (value: unknown) => void;
};

export default function Form({ children, onSave }: FormProps) {
  const form = useRef<HTMLFormElement | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  return (
    <form ref={form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
