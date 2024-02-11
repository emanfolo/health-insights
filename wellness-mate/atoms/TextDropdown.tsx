import React, { useState } from "react";
import { DownArrow } from "../icons";

export const TextDropdown = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};
