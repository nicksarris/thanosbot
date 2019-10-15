import React from 'react';
import './index.css';

const Attribute = (props) => (
  /* Final Rendered Component/States */
  <div className="attribute">
    <div className="attributeSymbol">
      <i className="fa fa-check" />
    </div>
    <div className="attributeTitle">
      {props.title}
    </div>
    <div className="attributeDescription">
      {props.description}
    </div>
  </div>
)

export default Attribute;
