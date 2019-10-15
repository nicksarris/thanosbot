import React from 'react';
import './index.css';

const MainImage = (props) => (
  /* Final Rendered Component/States */
  <div className="mainImageContainer">
    <div className="mainImageOverlay" />
    <div className="mainImageBackground">
      <div className="mainImageContainerInner">
        <div className="mainImageTextbox">
          <div className="mainImageTitle">
            {props.title}
          </div>
          <div className="mainImageTagline">
            {props.tagline}
          </div>
          <div className="mainImageButton" onClick={props.scroll}>
            {props.button}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default MainImage;
