import { forwardRef, type ReactNode, useImperativeHandle, useRef } from "react";
import Portal from "../Portal";

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

type ModalProps = {
  children: ReactNode
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { children }: ModalProps,
  ref,
) {
  const modalRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => {
    return {
      open() {
        modalRef.current?.showModal();
      },
      close() {
        modalRef.current?.close();
      }
    };
  });

  return (
    <Portal>
      <dialog ref={modalRef} className="modal">{children}</dialog>
    </Portal>
  );
});

export default Modal;
