import React from "react"

export const TextInput = ({ label, value, handleChange, defaultValue, isPassword }) => (
  <div className='uk-margin-medium'>
    <label>
      {label[0].toUpperCase() + label.slice(1)}
      <input
        type={isPassword ? "password" : "text"}
        className='uk-input' value={value || ""}
        placeholder={value ? undefined : defaultValue || label}
        onChange={e => handleChange(label, e.target.value)}
      />
    </label>
  </div>
)
