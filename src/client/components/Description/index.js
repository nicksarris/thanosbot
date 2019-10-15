import React from 'react';
import './index.css';

const Description = (props) => (
  /* Final Rendered Component/States */
  <div className="descriptionContainer">
    <div className="descriptionContainerInner">
      <div className="descriptionContainerSecondary">
        <div className="descriptionContainerSecondaryInner">
          {props.children}
        </div>
      </div>
    </div>
  </div>
)

export default Description;
