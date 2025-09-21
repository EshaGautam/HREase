import React from "react";
import type { FC, PropsWithChildren } from "react";
import ButtonStyles from "../../style/Button.module.css";

export type ButtonProps = PropsWithChildren<{
  label?: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  variant?: "default" | "blue" | "light" | "danger" | "success" | "trash" | string;
  span?: boolean;
  submitButtonStyle?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: string | React.ReactNode;
  iconStyle?: React.CSSProperties;
  form?: string;
  customClass?: string;
}>;

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  type,
  disabled = false,
  submitButtonStyle = {},
  span = true,
  icon,
  iconStyle,
  form,
  customClass = "",
  variant,
  children,
  ...rest
}) => {
  const baseClass = disabled
    ? ButtonStyles.button_disabled
    : variant === "blue"
    ? ButtonStyles.button_blue
    : variant === "light"
    ? ButtonStyles.button_light
    : variant === "danger"
    ? ButtonStyles.button_danger
    : variant === "success"
    ? ButtonStyles.button_success
    : variant === "trash"
    ? ButtonStyles.button_trash
    : ButtonStyles.button;

  const combinedClassName = `${baseClass} ${customClass}`.trim();

  const validProps = { ...rest };
  delete (validProps as any).span;
  delete (validProps as any).customClass;

  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      type={type}
      style={submitButtonStyle}
      onClick={onClick}
      form={form}
      {...validProps}
    >
      {/* {icon && (
        typeof icon === "string" ? (
        <svg style={iconStyle} className="responsiveIcon">
            <use xlinkHref={`/assets/sprite.svg#${icon}`} />
          </svg>
        ) : (
          icon
        )
      )} */}
      {label} 
      {children}
    </button>
  );
};

export default Button;
