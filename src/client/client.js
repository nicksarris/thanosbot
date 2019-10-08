import React, { useState } from 'react';

/* Components Used */
import Entry from "./components/Entry/index.js"
import Header from "./components/Header/index.js"
import Section from "./components/Section/index.js"
/* Components Used */

import logo from './logo.svg';
import './client.css';

function App() {
  /* Individual Component States */
  const [groupID, setGroupID] = useState("");
  const [tokenID, setTokenID] = useState("");
  const [currentStep, updateStep] = useState("");
  const [activePage, setActivePage] = useState("Example Usage");
  const [isLoading, setLoading] = useState(false);
  /* Final Rendered Component/States */
  return (
    <div className="thanosContainer">
      <div className="thanosContainerInner">
        <div className="thanosContainerSidebar">
          <div className="thanosContainerHeader">
            <div className="thanosContainerTitle">Documentation</div>
            <div className="thanosContainerVersion">v1.0.0</div>
          </div>
          <div className="thanosContainerDocumentation">
            <div className="thanosContainerDocumentationSection">
              <Section title={"Implementation"} />
              <Header title={"ThanosBot Implementation"} />
              <div className="thanosContainerDocumentationContainer">
                <Entry title={"Example Usage"} />
              </div>
            </div>
            <div className="thanosContainerDocumentationSection">
              <Section title={"Endpoints"} />
              <Header title={"Group Endpoints"} />
              <div className="thanosContainerDocumentationContainer">
                <Entry title={"/groups/"} />
                <Entry title={"/groups/<groupName/"} />
                <Entry title={"/groups/<groupId>/nickname/"} />
                <Entry title={"/groups/<groupId>/users/"} />
                <Entry title={"/groups/<groupId>/remove/"} />
                <Entry title={"/groups/<botId>/message/"} />
              </div>
              <Header title={"Bot Endpoints"} />
              <div className="thanosContainerDocumentationContainer">
                <Entry title={"/bots/<groupId>/create/"} />
                <Entry title={"/bots/<botId>/destroy/"} />
              </div>
              <Header title={"Thanos Endpoints"} />
              <div className="thanosContainerDocumentationContainer">
                <Entry title={"/thanos/<groupId>/<nickname>/"} />
              </div>
            </div>
          </div>
        </div>
        <div className="thanosContainerInformation">
          <div className="thanosContainerHeader">
            <div className="thanosContainerLocation">{"ThanosBot > " + activePage}</div>
            <div className="thanosContainerCreator">Nick Sarris</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
