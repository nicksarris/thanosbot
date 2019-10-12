import React from 'react';
import './index.css';

function Header({
  title,
  active
}) {
  return (
    <div className="entryContainer">
      <div className="entryBullet">&#8226;</div>
      <div className="entryTitle">{title}</div>
    </div>
  )
}

export default Header;
