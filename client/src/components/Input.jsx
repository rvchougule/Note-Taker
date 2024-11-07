/* eslint-disable react/prop-types */
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function Input({
  id,
  type,
  label,
  placeholder,
  name,
  value,
  onchange,
  error,
  flag,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 relative" key={id}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {type === "password" && !(flag === "register") && (
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
        )}
      </div>
      <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type={open ? "text" : type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onchange}
      />
      {type === "password" && (
        <span className="absolute top-8 right-3 ">
          {open ? (
            <Eye
              className="w-8"
              onClick={() => {
                setOpen(false);
              }}
            />
          ) : (
            <EyeClosed
              className="w-8"
              onClick={() => {
                setOpen(true);
              }}
            />
          )}
        </span>
      )}
      <p className="text-sm  text-red-500 font-semibold ">{error}</p>
    </div>
  );
}
