/*
 *
 * Index Component
 *
 */

import React, { useState, useRef, useEffect } from 'react';

/* Components Used */
import Attribute from "../../components/Attribute/index.js"
import Description from "../../components/Description/index.js"
import Footer from "../../components/Footer/index.js"
import HeaderTransparent from "../../components/HeaderTransparent/index.js"
import MainImage from "../../components/MainImage/index.js"
import Select from "../../components/Select/index.js"
import SnapButton from "../../components/SnapButton/index.js"
import SnapContainer from "../../components/SnapContainer/index.js"
import SnapInstruction from "../../components/SnapInstruction/index.js"
import SnapModule from "../../components/SnapModule/index.js"
import SnapModuleRow from "../../components/SnapModuleRow/index.js"
import SnapStatus from "../../components/SnapStatus/index.js"
import SnapText from "../../components/SnapText/index.js"
import SnapTitle from "../../components/SnapTitle/index.js"
/* Components Used */

import messages from './messages'
import './index.css';

function Index() {

  /* Individual Component States */
  const [currentAPIKey, setAPIKey] = useState("");
  const [finalAPIKey, finalizeAPIKey] = useState("N/A");
  const [finalGroupID, setGroupID] = useState("N/A");
  const [options, updateOptions] = useState([]);
  const [status, updateStatus] = useState("Inactive");
  const [hasSnapped, updateSnap] = useState(false);
  const [isSnapping, updateSnapState] = useState(false);

  /* Individual Component Refs */
  const scrollRef = useRef(null)
  const scrollToRef = (ref) => window.scrollTo({top: ref.current.offsetTop, behavior: "smooth"})
  const executeScroll = () => scrollToRef(scrollRef)

  /* Status UseEffect */
  useEffect(() => {

    /* Check to see if API is Active */
    function checkAPI() {
      const response = new Promise((resolve, reject) => {
        fetch('http://localhost:3001/api/groups?token=invalidAPIKey', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          updateStatus("Active")
          resolve(response)
        }).catch((error) => {
          updateStatus("Inactive")
          reject(error);
        })
      })
      return response
    }

    /* Check API's Current Status */
    checkAPI();
    var currentDate = '[' + new Date().toUTCString() + '] ';
    console.log("Checked API Status: " + currentDate)

  }, []);

  /* Snap UseEffect */
  useEffect(() => {

      /* Perform Thanos Snap on Selected Group */
      function performThanosSnap() {
        const response = new Promise((resolve, reject) => {
          fetch('http://localhost:3001/api/thanos/' + finalGroupID + '/snap?token=' + finalAPIKey, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            response.json().then((response) => {
              resolve(response)
            })
          })
        })
        updateSnap(true);
        updateSnapState(false);
        return response;
      }

      /* Ensure User has not Snapped Before */
      if (isSnapping === true) {
        if (hasSnapped === false) {
          performThanosSnap();
          var currentDate = '[' + new Date().toUTCString() + '] ';
          console.log("Attempted Thanos Snap: " + currentDate);
        }
      }

  /* Thanos Snap Dependencies */
  }, [finalAPIKey, finalGroupID, isSnapping, hasSnapped]);

  /* Set Group ID given Input */
  function setGroupData(e) {
    const groupData = e.split(",")
    setGroupID(groupData[groupData.length - 1])
  }

  /* Fetch ALL Possible Groups to Snap */
  function findGroups() {
    const response = new Promise((resolve, reject) => {
      fetch('http://localhost:3001/api/groups?token=' + currentAPIKey, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((response) => {
          resolve(response)
        })
      })
    })
    return response
  }

  /* Update Group Data with findGroups() Function */
  function updateGroups() {
    finalizeAPIKey(currentAPIKey);
    findGroups().then((response) => {
      if (response["errors"] === "") {
        var groupData = response["groups"].map(function(e, i) {
          return [e, " - ", response["groupsID"][i]]
        })
        updateOptions(groupData)
        setGroupID(groupData[0][2])
      }
      else {
        updateOptions([])
        setGroupID("N/A")
      }
    });
  }

  /* Utility Function to Update Group Data*/
  function setAPIData(e) {
    if (e.key === 'Enter') {
      updateGroups();
    }
  }

  /* Utility Function to Update Group Data*/
  function setAPIDataSecondary() {
    updateGroups();
  }

  /* Function to Ensure that User has ONLY SNAPPED ONCE */
  function setThanosSnap() {
    if (hasSnapped === false && isSnapping === false) {
      updateSnapState(true)
    }
  }

  /* Final Rendered Component/States */
  return (
    <div className="thanos">

      {/* Snap Header */}
      <HeaderTransparent />
      <MainImage title={"ThanosBot"}
                 tagline={"Perfectly balanced, as all things should be"}
                 button={"Perform the Snap"}
                 scroll={executeScroll}/>

      {/* Snap Attributes */}
      <Description>
        <Attribute title={"Quick"} description={messages.attribute1} />
        <Attribute title={"Entertaining"} description={messages.attribute2} />
        <Attribute title={"Simple"} description={messages.attribute3} />
      </Description>

      {/* Snap Functionality */}
      <SnapContainer ref={scrollRef}>
        <SnapTitle title={"Perform the Snap"} />
        <SnapStatus status={status} />
        <SnapModuleRow>
          <SnapModule>
            <SnapInstruction title={"Step 1: Enter your Access Token"} />
            {/* Snap Functionality (First Module) */}
            <div className="thanosFirstModule">
              <div className="thanosFirstModuleInner">
                <input className="thanosFirstModuleInput"
                       placeholder={"Enter your GroupMe Access Token ..."}
                       onChange={e => setAPIKey(e.target.value)}
                       onKeyDown={setAPIData}/>
                <SnapButton title={"Submit"} function={setAPIDataSecondary} />
              </div>
            </div>
            <SnapText style={{"margin-top": "10px"}}>{"Login to "}
              <a href="https://dev.groupme.com/">https://dev.groupme.com</a>
              {" and locate your 'Access Token'."}
            </SnapText>
            <SnapText style={{"margin-top": "5px"}}>
              {"Current Access Token: " + finalAPIKey}
            </SnapText>
          </SnapModule>
          <SnapModule>
            <SnapInstruction title={"Step 2: Select the Group to Snap"} />
            {/* Snap Functionality (Second Module) */}
            <div className="thanosSecondModule">
              <div className="thanosSecondModuleInner">
                <Select options={options} updateGroup={setGroupData}/>
              </div>
            </div>
            <SnapText style={{"margin-top": "10px"}}>
              {"Current Group ID: " + finalGroupID}
            </SnapText>
          </SnapModule>
        </SnapModuleRow>
        <SnapModule>
          <SnapButton title={"Perform the Snap"} function={setThanosSnap} />
        </SnapModule>
      </SnapContainer>

      {/* Snap Footer */}
      <Footer />

    </div>
  );
}

export default Index;
