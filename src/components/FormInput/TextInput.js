import React from "react";

const TextInput = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  isTextArea = false,
  rows = 4,
}) => {
  return (
    <div className="form-field">
      <label htmlFor={name} className={required ? "required" : ""}>
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          style={{ width: "100%" }}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default TextInput;
