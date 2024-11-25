import React from "react";

type CustomInputProps = {
  error?: boolean;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function CustomInput({
  error = false,
  helperText,
  ...props
}: CustomInputProps) {
  return (
    <div className="flex flex-col">
      <input
        {...props}
        className={`rounded-lg p-2 border outline-none h-11 text-2xl ${
          error
            ? "border-red-500" // เปลี่ยนสีขอบเมื่อ error
            : "border-[#c2b6b6]"
        }`}
      />
      {helperText && (
        <span className="text-red-500 text-sm mt-1">{helperText}</span>
      )}
    </div>
  );
}