import React, { useState } from "react";
import { DownArrow } from "../icons";

export const TextDropdown = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={className}>
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-1 cursor-pointer w-fit"
      >
        <text className="font-bold">{title}</text>
        <DownArrow />
      </div>

      {isOpen && (
        <div className="flex flex-col p-2 mt-2 border rounded-lg ">
          {children}
        </div>
      )}
    </div>
  );
};
