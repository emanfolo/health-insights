import React, { useState } from "react";
import { InputBadgeProps, MultiInputProps } from "../interfaces";
import { FieldArray } from "formik";

const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="8"
    width="8"
    viewBox="0 0 384 512"
  >
    <path
      opacity="1"
      fill="#1E3050"
      d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
    />
  </svg>
);

const InputBadge = ({ value, remove }: InputBadgeProps) => (
  <div className=" h-8 min-w-12 flex p-2 border rounded-lg justify-center items-center gap-3 bg-base-100">
    <text className="">{value}</text>
    <div onClick={remove} className=" cursor-pointer">
      <CrossIcon />
    </div>
  </div>
);

export const MultiValueInput = ({
  placeholder,
  label,
  name,
  className,
  type = "text",
  values,
}: MultiInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const disabled = values.length > 4;
  const buttonDisabled = inputValue.length === 0;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="block text-sm font-medium  text-gray-700"
      >
        {label}
      </label>
      <FieldArray name={name}>
        {({ remove, push }) => (
          <>
            <div className="mt-2 ">
              <input
                id={name}
                placeholder={placeholder}
                className={` rounded-tl-lg rounded-bl-lg  border-l border-t border-b h-[40px] w-4/5 ${className}`}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                disabled={disabled}
                maxLength={12}
              />
              <button
                type="button"
                disabled={disabled || buttonDisabled}
                className="border rounded-br-lg  rounded-tr-lg px-2 h-[40px] w-1/5 bg-base-100"
                onClick={() => {
                  push(inputValue);
                  setInputValue("");
                }}
              >
                Add
              </button>
            </div>

            <div className="mt-3 flex gap-3 flex-wrap">
              {values.length > 0 &&
                values.map((value, index) => (
                  <InputBadge
                    key={index}
                    value={value}
                    remove={() => remove(index)}
                  />
                ))}
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};
