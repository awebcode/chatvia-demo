import "./InputField.scss";

import * as React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { selectMode } from "../../../features/dashboard/dashboardSlice";
import { useAppSelector } from "../../../app/store";
import { useTranslation } from "react-i18next";

export interface ICustomTextfieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  name?: string;
  className?: string;
  value?: string;

  type: "text" | "password" | "email";

  onChange: any;
  onBlur?: any;
  helperText?: any;
  error?: any;
  inputProps?: any;

  autoFocus?: boolean;

  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  style?: React.CSSProperties;
}

export function InputField({
  label,
  placeholder,
  onChange,
  onBlur,
  name,
  className,
  type,
  helperText,
  error,
  prependIcon,
  appendIcon,
  autoFocus,
  value,
  style,
}: ICustomTextfieldProps) {
  const mode = useAppSelector(selectMode);
  const { t } = useTranslation();

  return (
    <div
      style={{ ...style }}
      className={`${className} input-field ${mode === "dark" ? "dark" : ""}`}
    >
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          {" "}
          {t(label)}{" "}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={type}
          placeholder={t(placeholder!)}
          onChange={onChange}
          onBlur={onBlur}
          name={t(name!)}
          endAdornment={appendIcon}
          startAdornment={prependIcon}
          label={t(label)}
          error={error}
          autoFocus={autoFocus}
          value={value}
        />

        {helperText && (
          <p className="text-red-600 font-semibold my-1"> {helperText} </p>
        )}
      </FormControl>
    </div>
  );
}
