import { Eye, EyeOff } from "lucide-react";
import { useState, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegisterReturn;
  name: string;
}

export const InputField = ({
  label,
  error,
  register,
  name,
  type = "text",
  readOnly,
  disabled,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2 relative">
      <label htmlFor={name} className="text-sm font-medium text-black/60 block">
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          type={isPassword && showPassword ? "text" : type}
          {...(register || {})}
          readOnly={readOnly}
          disabled={disabled}
          {...props}
          className={`w-full rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none border border-slate-200 ${
            readOnly || disabled
              ? "bg-gray-100 cursor-not-allowed text-gray-600"
              : "focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
