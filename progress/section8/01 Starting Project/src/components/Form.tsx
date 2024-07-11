import {
  type ComponentPropsWithRef,
  type FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

export type FormHandle = {
  clear: () => void;
};

type FormProps = ComponentPropsWithRef<"form"> & {
  onSave: (value: unknown) => void;
};

const Form = forwardRef<FormHandle, FormProps>(function Form(
  { children, onSave, ...otherProps },
  ref,
) {
  const form = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => {
    return {
      clear() {
        form.current?.reset();
      },
    };
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  return (
    <form ref={form} onSubmit={handleSubmit} {...otherProps}>
      {children}
    </form>
  );
});

export default Form;
