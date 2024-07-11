import { type ComponentPropsWithoutRef } from "react";
import { Link, type LinkProps } from "react-router-dom";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  el: "btn";
  textOnly?: boolean;
};

type LinkButtonProps = LinkProps & {
  el: "a";
  textOnly?: boolean;
};

export default function Button(props: LinkButtonProps | ButtonProps) {
  const { textOnly, ...rest } = props;
  const textOnlyClassName = textOnly ? "button--text-only" : undefined;

  if (rest.el === "a") {
    const { el: _, ...linkProps } = rest;
    return (
      <Link className={`button ${textOnlyClassName}`} {...linkProps}></Link>
    );
  }

  const { el: _, ...buttonProps } = rest;
  return (
    <button className={`button ${textOnlyClassName}`} {...buttonProps}></button>
  );
}
