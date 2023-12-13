import { ButtonProps } from "../interfaces";

export const Button = ({ onClick, text, className, type }: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        className={`bg-black text-white p-3 rounded-lg text-sm  hover:opacity-80  ${className}`}
        onClick={onClick}
      >
        <text>{text}</text>
      </button>
    </div>
  );
};
