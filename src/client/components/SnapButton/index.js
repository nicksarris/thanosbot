import React from 'react';
import './index.css';

const SnapButton = (props) => (
  /* Final Rendered Component/States */
  <button className="snapButton" onClick={props.function}>
    {props.title}
  </button>
)

export default SnapButton;
