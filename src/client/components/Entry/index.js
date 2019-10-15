import React from 'react';
import './index.css';

const Entry = (props) => (
  /* Final Rendered Component/States */
  <div className="entryContainer">
    <div className="entryBullet">&#8226;</div>
    <div className="entryTitle">
      {props.title}
    </div>
  </div>
)

export default Entry;
