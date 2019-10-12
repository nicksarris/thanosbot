/*
 *
 * Documentation Component
 *
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* Components Used */
import Branch from "../../components/Branch/index.js"
import Entry from "../../components/Entry/index.js"
/* Components Used */

import './index.css';

function Documentation() {
  /* Individual Component States */
  const [groupID, setGroupID] = useState("");
  const [tokenID, setTokenID] = useState("");
  const [currentStep, updateStep] = useState("");
  const [activePage, setActivePage] = useState("Example Usage");
  const [isLoading, setLoading] = useState(false);
  /* Final Rendered Component/States */
  return (
    <div className="thanos">
      <div className="thanosContainerHeaderSecondary">
        <div className="thanosContainerHeaderInnerSecondary">
          <Link className="thanosContainerHeaderLogoSecondary" to="/">ThanosBot</Link>
          <Link className="thanosContainerHeaderDocumentationSecondary" to="/documentation">Documentation</Link>
        </div>
      </div>
      <div className="thanosInner">
        <div className="thanosBackground">
          <div className="thanosBackgroundLeft" />
          <div className="thanosBackgroundRight" />
        </div>
        <div className="thanosInnerContainer">
          <div className="thanosInformation">
            <div className="thanosSecondaryHeader">
              <div className="thanosLocation">{"ThanosBot > " + activePage}</div>
            </div>
          </div>
          <div className="thanosSidebar">
            <div className="thanosSecondaryHeader">
              <div className="thanosTitle">Documentation</div>
              <div className="thanosVersion">v1.0.0</div>
            </div>
            <div className="thanosDocumentation">
              <div className="thanosDocumentationSection">
                <Branch title={"ThanosBot Implementation"} />
                <div className="thanosDocumentationContainer">
                  <Entry title={"Example Usage"} />
                </div>
              </div>
              <div className="thanosDocumentationSection">
                <Branch title={"Group Endpoints"} />
                <div className="thanosDocumentationContainer">
                  <Entry title={"/groups/"} />
                  <Entry title={"/groups/<groupName/"} />
                  <Entry title={"/groups/<groupId>/nickname/"} />
                  <Entry title={"/groups/<groupId>/users/"} />
                  <Entry title={"/groups/<groupId>/remove/"} />
                  <Entry title={"/groups/<botId>/message/"} />
                </div>
              </div>
              <div className="thanosDocumentationSection">
                <Branch title={"Bot Endpoints"} />
                <div className="thanosDocumentationContainer">
                  <Entry title={"/bots/<groupId>/create/"} />
                  <Entry title={"/bots/<botId>/destroy/"} />
                </div>
              </div>
              <div className="thanosDocumentationSection">
                <Branch title={"Thanos Endpoints"} />
                <div className="thanosDocumentationContainer">
                  <Entry title={"/thanos/<groupId>/<nickname>/"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documentation;
