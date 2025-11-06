export const InputField = ({ label, error, register, name, readOnly, disabled, ...props }: any) => (
  <div className="space-y-1">
    <label htmlFor={name} className="text-sm font-medium text-gray-800 block">
      {label}
    </label>

    <input
      id={name}
      {...register(name)}
      readOnly={readOnly}
      disabled={disabled}
      {...props}
      className={`w-full rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none ${
        readOnly || disabled
          ? "bg-gray-100 cursor-not-allowed text-gray-600"
          : "focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
      }`}
    />

    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);
