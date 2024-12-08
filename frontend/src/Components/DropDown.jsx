import React from 'react'

function DropDown({ label, options, selectedValue, onChange, disabled }) {
  return (
    <select className='p-2 rounded-lg block' value={selectedValue} onChange={onChange} disabled={disabled}>
      <option value="">-- Select {label} --</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default DropDown