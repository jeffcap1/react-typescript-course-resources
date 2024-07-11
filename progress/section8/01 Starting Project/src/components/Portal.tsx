import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: ReactNode;
};

export default function Portal({ children }: PortalProps) {
  const root = document.getElementById("modal-root");
  const el = document.createElement("div");

  useEffect(() => {
    root?.appendChild(el);

    return () => {
      root?.removeChild(el);
    };
  }, [el, root]);

  return createPortal(children, el);
}
