import { InputProps } from "../interfaces";
import { useField } from "formik";

export const Input = ({
  placeholder,
  label,
  name,
  className,
  type = "text",
  disabled,
}: InputProps) => {
  const [field, meta] = useField(name);
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="block text-sm font-medium  text-gray-700"
      >
        {label}
      </label>
      <input
        id={name}
        {...field}
        placeholder={placeholder}
        className={`border rounded-lg p-1.5 ${className}`}
        type={type}
        disabled={disabled}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
