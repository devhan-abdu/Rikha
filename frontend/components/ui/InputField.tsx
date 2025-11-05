export const InputField = ({ label, error, register, name, ...props }: any) => (
    <div className="space-y-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-800 block">
            {label}
        </label>

        <input id={name} {...register(name)} {...props} className="w-full rounded-md px-3 py-2  text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
        {
            error && <p className="text-red-500 text-xs">{error}</p>
        }
    </div>
)