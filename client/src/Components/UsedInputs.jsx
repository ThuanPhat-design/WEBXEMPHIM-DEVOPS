import React from "react";
export const Message = ({ label, placeholder, name, register }) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <textarea
        className="w-full h-40 mt-2 p-6 bg-main border border-border rounded"
        placeholder={placeholder}
        {...register}
        name={name}
      ></textarea>
    </div>
  );
};

export const Select = React.forwardRef(
  (
    {
      label,
      options = [],
      name,
      value: controlledValue,
      onChange: controlledOnChange,
      register,
      ...rest
    },
    ref
  ) => {
    const isControlled = typeof controlledOnChange === "function";

    return (
      <div className="text-sm w-full">
        {label && (
          <label htmlFor={name} className="text-border font-semibold block mb-1">
            {label}
          </label>
        )}
        <select
          id={name}
          name={name}
          ref={ref}
          className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded"
          {...(isControlled
            ? {
                value: controlledValue,
                onChange: controlledOnChange
              }
            : register)}
          {...rest}
        >
          <option value="" disabled>
            Chọn {label.toLowerCase()}
          </option>
          {options.map((o, i) => (
            <option key={i} value={o.title}>
              {o.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";

export const Input = ({ label, placeholder, type, bg, register, name, value, onChange }) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...register}
        type={type}
        placeholder={placeholder}
        className={`w-full text-sm mt-2 p-5 border-border rounded text-white ${bg ? 'bg-main' : "bg-dry"
          }`}
      />
    </div>
  );
};
export const ControlledTextarea = React.forwardRef(
  ({ label, name, placeholder, value, onChange, ...rest }, ref) => (
    <div className="text-sm w-full">
      {label && (
        <label htmlFor={name} className="text-border font-semibold block mb-1">
          {label}
        </label>
      )}
      <textarea
        autoFocus
        id={name}
        name={name}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-40 mt-2 p-6 bg-main border border-border rounded text-white resize-none"
        {...rest}
      />
    </div>
  )
);

ControlledTextarea.displayName = "ControlledTextarea";
