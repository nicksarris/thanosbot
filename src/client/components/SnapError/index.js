import React from 'react';
import './index.css';

function SnapError(props) {
  /* Individual Classnames */
  const snapError = (props.error !== "") ? "snapErrorTitle" : ""
  /* Final Rendered Component/States */
  return (
    <div className="snapError">
      <div className={snapError}>
        {props.error}
      </div>
    </div>
  )
}

export default SnapError;
