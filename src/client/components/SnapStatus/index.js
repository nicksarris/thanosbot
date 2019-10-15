import React from 'react';
import './index.css';

const SnapStatus = (props) => (
  /* Final Rendered Component/States */
  <div className="snapStatus">
    <div className="snapStatusTitle">{"Current Status: "}</div>
    <span className="snapStatusState">{props.status}</span>
  </div>
)

export default SnapStatus;
