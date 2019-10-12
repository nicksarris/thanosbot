import React from 'react';
import './index.css';

function Attribute({
  title,
  description,
}) {
  return (
    <div className="attribute">
      <div className="attributeSymbol">
        <i className="fa fa-check" />
      </div>
      <div className="attributeTitle">
        {title}
      </div>
      <div className="attributeDescription">
        {description}
      </div>
    </div>
  );
}

export default Attribute;
