/*
 *
 * Index Component
 *
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* Components Used */
import Attribute from "../../components/Attribute/index.js"
import Select from "../../components/Select/index.js"
/* Components Used */

import './index.css';

function Index() {
  /* Individual Component States */
  const [currentAPIKey, setAPIKey] = useState("");
  const [finalAPIKey, finalizeAPIKey] = useState("N/A");
  const [finalGroup, setGroup] = useState("");
  const [finalGroupID, setGroupID] = useState("N/A");
  const [options, updateOptions] = useState([]);
  /* Useful Functions */
  function setGroupData(e) {
    const groupData = e.split(",")
    console.log(groupData);
    setGroup(groupData[0])
    setGroupID(groupData[groupData.length - 1])
  }
  function findGroups() {
    const response = new Promise((resolve, reject) => {
      fetch('http://localhost:3001/groups?token=' + currentAPIKey, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        const json = response.json().then((response) => {
          resolve(response)
        })
      })
    })
    return response
  }
  function performThanosSnap() {
    console.log(finalGroupID, finalAPIKey);
  }
  function setAPIData(e) {
    if (e.key === 'Enter') {
      updateGroups();
    }
  }
  function setAPIDataSecondary() {
    updateGroups();
  }
  function updateGroups() {
    finalizeAPIKey(currentAPIKey);
    findGroups().then((response) => {
      console.log(response);
      if (response["errors"] === "") {
        var groupData = response["groups"].map(function(e, i) {
          return [e, " - ", response["groupsID"][i]]
        })
        updateOptions(groupData)
        setGroup(groupData[0][0])
        setGroupID(groupData[0][2])
      }
      else {
        updateOptions([])
        setGroup("")
        setGroupID("N/A")
      }
    });
  }
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
        <div className="thanosSnapInner">
          <div className="thanosSnapTitle">Perform the Snap</div>
          <div className="thanosSnapStepContainer">
            <div className="thanosSnapStep">
              <div className="thanosSnapInstruction">Step 1: Enter your Access Token</div>
              <div className="thanosAPIContainer">
                <div className="thanosAPIContainerInner">
                  <input className="thanosGroupMeAPIKey"
                         placeholder={"Enter your GroupMe Access Token ..."}
                         onChange={e => setAPIKey(e.target.value)}
                         onKeyDown={setAPIData}/>
                  <button className="thanosGroupMeButton" onClick={setAPIDataSecondary}>Submit</button>
                </div>
              </div>
              <div className="thanosAPITutorial">{"Login to "}
                <a href="https://dev.groupme.com/">https://dev.groupme.com</a>
                {" and locate your 'Access Token'."}
              </div>
              <div className="thanosAPITutorialSecondary">{"Current Access Token: " + finalAPIKey}</div>
            </div>
            <div className="thanosSnapStep">
              <div className="thanosSnapInstruction">Step 2: Select the Group to Snap</div>
              <div className="thanosSnapGroupSelectContainer">
                <div className="thanosSnapGroupSelectContainerInner">
                  <Select options={options} updateGroup={setGroupData}/>
                </div>
              </div>
              <div className="thanosAPITutorialSecondary">{"Current Group ID: " + finalGroupID}</div>
            </div>
          </div>
          <div className="thanosSnapStep">
            <button className="thanosSnapButton" onClick={performThanosSnap}>Perform the Snap</button>
          </div>
        </div>
      </div>
      <div className="thanosResults">
        <div className="thanosResultsTitle">Snap Results</div>
        <div className="thanosResultsInner">

        </div>
      </div>
    </div>
  );
}

export default Index;
