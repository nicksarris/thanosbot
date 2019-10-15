import React from 'react';
import './index.css';

const SnapContainer = React.forwardRef((props, ref) => (
  /* Final Rendered Component/States */
  <div className="snapContainer" ref={ref}>
    <div className="snapContainerInner">
      {props.children}
    </div>
  </div>
))

export default SnapContainer;
