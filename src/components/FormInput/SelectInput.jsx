import React from "react";
import "./SelectInput.css";

const SelectInput = ({
  label,
  value,
  options,
  onChange,
  selectsomthingtext,
  name,
  required,
  disabled,
  className,
  labelClassName,
}) => {
  // console.log(options);
  return (
    <div className={`form-group ${className || ""}`}>
      <label className={`form-label ${labelClassName || ""}`}>
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        disabled={disabled}
        className="select-field"
      >
        <option value="">{selectsomthingtext || "Select"}</option>
        {options?.map((option) => (
          <option key={option._id} value={option._id}>
            {option?.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
