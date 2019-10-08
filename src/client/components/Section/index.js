import React, { useState } from 'react';
import './index.css';

function Section({
  title,
}) {
  return (
    <div className="sectionTitle">
      {title}
    </div>
  )
}

export default Section;
