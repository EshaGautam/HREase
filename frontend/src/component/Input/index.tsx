import React, { type FC, useState, type PropsWithChildren, type ChangeEvent } from "react";
import classes from "../../style/Input.module.css"

type TextInputProps = PropsWithChildren<{
  icon?: string;
  label: string;
  name?: string;
  valid?: boolean;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  style?: React.CSSProperties;
  type?: React.HTMLInputTypeAttribute;
  containerStyle?: React.CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | ReadonlyArray<string> | number;
  customInputWrapperClass?: string;
  customInputFieldClass?: string;
  customLabelClass?: string;
  customIconClass?: string;
  id?: string;
}>;

const Input: FC<TextInputProps> = ({
  icon,
  label,
  name,
  valid,
  required,
  placeholder,
  errorMessage,
  style,
  type: initialType = "text",
  containerStyle,
  onChange,
  value,
  customInputWrapperClass,
  customInputFieldClass,
  customLabelClass,
  customIconClass,
  id,
}) => {
  const [type, setType] = useState<React.HTMLInputTypeAttribute>(initialType);
  const [isFocused, setIsFocused] = useState(false);

  const inputId = id || `${name || "input"}-${Math.random().toString(36).slice(2, 9)}`;

  const togglePassword = () => {
    if (initialType === "password") {
      setType(type === "text" ? "password" : "text");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (initialType === "date") {
      const date = new Date(e.target.value);
      const formatted = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}-${date.getFullYear()}`;
      onChange?.({ ...e, target: { ...e.target, value: formatted } });
    } else {
      onChange?.(e);
    }
  };

  return (
    <div className={classes["input-container"]} style={containerStyle}>
      <label htmlFor={inputId} className={`${classes["input-label"]} ${customLabelClass}`}>
        {label}
      </label>

      <div
        className={`${classes["input-wrapper"]} ${customInputWrapperClass} ${
          isFocused ? classes["input-wrapper--focused"] : ""
        }`}
      >
        {icon && (
          <svg
            className={`${classes["input-icon"]} ${customIconClass} ${
              isFocused ? classes["input-icon--focused"] : ""
            }`}
            role="img"
            aria-label={`${icon} icon`}
          >
            <use xlinkHref={`/assets/sprite.svg#${icon}`} />
          </svg>
        )}

        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          className={`${classes["input-field"]} ${customInputFieldClass}`}
          style={style}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {valid && (
          <svg className={classes["input-icon--check"]} role="img" aria-label="valid icon">
            <use xlinkHref={`/assets/sprite.svg#icon-checkmark`} />
          </svg>
        )}

        {initialType === "password" && (
          <button
            type="button"
            className={classes["input-toggle-password"]}
            onClick={togglePassword}
          >
            <svg>
              <use
                xlinkHref={`/assets/sprite.svg#icon-${type === "password" ? "eye" : "eye-off"}`}
              />
            </svg>
          </button>
        )}
      </div>

      {errorMessage && <span className={classes["input-error"]}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
