"use client";

import { ComponentProps, ReactNode } from "react";

type FormSubmitButtonProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"button">;

const FormSubmitButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  return (
    <button {...props} type="submit" className={`btn btn-primary ${className}`}>
      {children}
    </button>
  );
};

export default FormSubmitButton;
