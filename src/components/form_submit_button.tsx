"use client";

import { MouseEventHandler, ReactNode } from "react";
import { useForm } from "react-hook-form";

type FormSubmitButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onclick?: MouseEventHandler<HTMLButtonElement>;
};

const FormSubmitButton = ({
  children,
  className,
  type = "submit",
  onclick,
}: FormSubmitButtonProps) => {
  const { formState } = useForm();

  return (
    <button
      type={type}
      className={`btn btn-primary ${className || ""}`}
      disabled={formState.isSubmitting}
      onClick={onclick}
    >
      {formState.isSubmitting && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default FormSubmitButton;
