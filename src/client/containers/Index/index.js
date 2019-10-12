/*
 *
 * Index Component
 *
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* Components Used */
import Attribute from "../../components/Attribute/index.js"
/* Components Used */

import './index.css';

function Index() {
  /* Final Rendered Component/States */
  return (
    <div className="thanos">
      <div className="thanosContainerHeader">
        <div className="thanosContainerHeaderInner">
          <Link className="thanosContainerHeaderLogo" to="/">ThanosBot</Link>
          <Link className="thanosContainerHeaderDocumentation" to="/documentation">Documentation</Link>
        </div>
      </div>
      <div className="thanosImage">
        <div className="thanosImageOverlay" />
        <div className="thanosImageBackground">
          <div className="thanosImageInner">
            <div className="thanosSecondary">
              <div className="thanosSecondaryTitle">ThanosBot</div>
              <div className="thanosTagline">Perfectly balanced, as all things should be</div>
              <div className="thanosButton">Perform the Snap</div>
            </div>
          </div>
        </div>
      </div>
      <div className="thanosDescription">
        <div className="thanosDescriptionInner">
          <div className="thanosDescriptionSecondary">
            <div className="thanosDescriptionSecondaryInner">
              <Attribute title={"Quick"} description={"While not instantaneous (We are limited by the GroupMe API), ThanosBot can easily snap all but the biggest groups before anyone will notice the chaos ensuing."} />
              <Attribute title={"Entertaining"} description={"ThanosBot seeks to provide the entertainment that can only come from watching half of your closest friends (or acquaintances) crumble to dust. No assembly required."} />
              <Attribute title={"Simple"} description={"It's never been easier to randomly select and remove half of any one group. With ThanosBot, all that's necessary is the push of a single button."} />
            </div>
          </div>
        </div>
      </div>
      <div className="thanosSnap">
      </div>
    </div>
  );
}

export default Index;
