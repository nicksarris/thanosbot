import React, { useState } from 'react';
import './index.css';

function Select({
  options,
  updateGroup,
}) {
  /* Individual Component States */
  const [value, setValue] = useState("");
  /* Useful Functions */
  function updateValue(e) {
    setValue(e.target.value)
    updateGroup(e.target.value)
  }
  /* Final Rendered Component/States */
  return (
    <select className="selectContainer"
            value={value}
            onChange={updateValue}>
      {options.map(optionData => {
        return <option value={optionData} key={optionData}>{optionData}</option>
      })}
    </select>
  )
}

export default Select;
