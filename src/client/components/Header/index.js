import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Header = (props) => (
  /* Final Rendered Component/States */
  <div className="headerContainer">
    <div className="headerContainerInner">
      <Link className="headerContainerLogo" to="/">ThanosBot</Link>
      <a className="headerContainerDocumentation"
         href="https://github.com/nicksarris/thanosbot/">
         Documentation
      </a>
    </div>
  </div>
)

export default Header;
