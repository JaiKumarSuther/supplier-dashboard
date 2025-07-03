import React from 'react';

const DropdownIcon = "/images/arrow-drop-down-svgrepo-com.svg";

interface SelectBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  value,
  onChange,
  options,
  className = 'w-[220px]',
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        backgroundImage: `url(${DropdownIcon})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "1.3rem",
        paddingRight: "1rem",
        appearance: "none",
      }}
      className={`${className} border border-gray-300 rounded-lg px-4 py-2 text-[14px] text-[#808080]`}
    >
      {options.map((opt, index) => (
        <option key={index} value={opt}>{opt}</option>
      ))}
    </select>
  );
};

export default SelectBox;