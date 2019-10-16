import React from 'react';
import './index.css';

const Footer = (props) => (
  /* Final Rendered Component/States */
  <div className="footerContainer">
    &copy;<span>{" October 2019 | Chi Solutions. All Rights Reserved. Created by Nick Sarris"}</span>
    <div className="footerContainerDonations">{"Donations Appreciated  -  Venmo: @nicksr987"}</div>
  </div>
)

export default Footer;
