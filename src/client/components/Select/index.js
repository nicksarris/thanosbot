import React, { useState } from 'react';
import './index.css';

function Select(props) {
  /* Individual Component States */
  const [value, setValue] = useState("");
  /* Useful Functions */
  function updateValue(e) {
    setValue(e.target.value)
    props.updateGroup(e.target.value)
  }
  /* Final Rendered Component/States */
  return (
    <select className="selectContainer"
            value={value}
            onChange={updateValue}>
      {props.options.map(optionData => {
        return <option value={optionData} key={optionData}>{optionData}</option>
      })}
    </select>
  )
}

export default Select;
