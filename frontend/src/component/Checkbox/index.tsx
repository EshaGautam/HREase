import React from 'react';
import type { FC } from 'react';
import CheckboxStyles from '../../styles/Checkbox.module.css'

type CheckboxProps = {
  name?: string;
  label?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorMessage?: string;
  containerStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  checkboxStyle?: React.CSSProperties;
  labelClass?: string;
  hideCheckbox?:boolean
};

const CheckboxInput: FC<CheckboxProps> = ({ name, label, checked, onChange, disabled, errorMessage, containerStyle, labelStyle, checkboxStyle, labelClass,hideCheckbox }) => {
  return (
    <div className={CheckboxStyles.form_input} style={containerStyle}>
      <label className={`${CheckboxStyles.form_input__label} ${labelClass || ''}`} style={labelStyle}>  {label}
      </label>
        <input
          type='checkbox'
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        className={`${CheckboxStyles.form_input__checkbox} ${hideCheckbox ? CheckboxStyles.hiddenCheckbox : ''}`}
          style={checkboxStyle}
        />
      
      {errorMessage && <p className={CheckboxStyles.form_input__error}>{errorMessage}</p>}
    </div>
  );
};

export default CheckboxInput;
