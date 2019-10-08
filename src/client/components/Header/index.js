import React, { useState } from 'react';
import './index.css';

function Header({
  title,
}) {
  return (
    <div className="headerTitle">
      {title}
    </div>
  )
}

export default Header;
