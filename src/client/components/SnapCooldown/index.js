import React from 'react';
import './index.css';

const SnapCooldown = (props) => (
  /* Final Rendered Component/States */
  <div className="snapCooldown">
    <div className="snapCooldownTitle">{"Cooldown Ends: "}</div>
    <span className="snapCooldownState">{props.cooldown}</span>
  </div>
)

export default SnapCooldown;
