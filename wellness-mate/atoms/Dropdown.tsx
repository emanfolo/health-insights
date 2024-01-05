import { DropdownProps } from "../interfaces";
import { useField } from "formik";

const getValue = (id: string): string => {
  const words = id.split("_");
  const firstWord = words[0];
  const secondWord = words[1];

  const firstLetter = firstWord.charAt(0).toUpperCase();
  const remainingLetters = firstWord.slice(1);

  return firstLetter + remainingLetters + (secondWord ? " " + secondWord : "");
};

export const Dropdown = ({
  label,
  labelClass,
  itemIds,
  className,
  name,
  disabled,
}: DropdownProps) => {
  const [field, meta] = useField(name);

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`block text-sm font-medium text-gray-700 ${labelClass}`}
      >
        {label}
      </label>
      <select
        {...field}
        disabled={disabled}
        id={name}
        className="mt-1 block w-full h-[40px] p-2  rounded-lg text-base border sm:text-sm "
      >
        {itemIds.map((itemId) => (
          <option key={itemId} value={itemId}>
            {getValue(itemId)}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
