import React from 'react';
import './index.css';

const SnapStatus = (props) => (
  /* Final Rendered Component/States */
  <div className="snapStatusContainer">
    <div className="snapStatusContainerInner">{"Current Status: "}</div>
    <span className="snapStatusState">{props.status}</span>
  </div>
)

export default SnapStatus;
