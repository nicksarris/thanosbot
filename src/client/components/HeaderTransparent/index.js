import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const HeaderTransparent = (props) => (
  /* Final Rendered Component/States */
  <div className="headerContainer">
    <div className="headerContainerInner">
      <Link className="headerContainerLogo" to="/">ThanosBot</Link>
      <Link className="headerContainerDocumentation" to="/documentation">Documentation</Link>
    </div>
  </div>
)

export default HeaderTransparent;
