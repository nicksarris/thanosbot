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
import SnapError from "../../components/SnapError/index.js"
import SnapInstruction from "../../components/SnapInstruction/index.js"
import SnapModule from "../../components/SnapModule/index.js"
import SnapModuleRow from "../../components/SnapModuleRow/index.js"
import SnapStatus from "../../components/SnapStatus/index.js"
import SnapText from "../../components/SnapText/index.js"
import SnapTextSecondary from "../../components/SnapTextSecondary/index.js"
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
  const [error, updateError] = useState("");
  const [cooldown, updateCooldown] = useState("");
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
        fetch('http://localhost:3001/api/activity/active', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          updateStatus("Active")
          resolve(response)
        }).catch((error) => {
          updateStatus("Inactive")
          updateError("The Service is Currently Unavailable")
          reject(error);
        })
      })
      return response
    }

    /* Convert 24 Hour Cycle to 12 Hour Cycle */
    function formatTime(hour) {
      if (hour > 12) {
        return hour - 12;
      }
      else if (hour === 0) {
        return 12;
      }
      return hour;
    }

    /* Check to see if Snap is on Cooldown */
    function checkCooldown(currentDate, cooldownDate) {
      if (cooldownDate == null) {
        updateCooldown("N/A");
      }
      else if (currentDate.getTime() < cooldownDate.getTime()) {
        var time = formatTime(cooldownDate.getHours()) + ":" + cooldownDate.getMinutes()
        updateCooldown(time);
      }
      else {
        updateCooldown("N/A");
      }
    }

    /* Check Cooldown's Current Status Initially */
    var currentDateInitial = new Date()
    var cooldownDateInitial = new Date(window.localStorage.getItem("cooldown"));
    checkCooldown(currentDateInitial, cooldownDateInitial);
    var cooldownInitial = '[' + new Date().toUTCString() + '] ';
    console.log("Checked Cooldown Status: " + cooldownInitial)

    /* Check API's Current Status Initially */
    checkAPI();
    var apiInitial = '[' + new Date().toUTCString() + '] ';
    console.log("Checked API Status: " + apiInitial)

    /* Check API/Cooldown Status Every Minute */
    const interval = setInterval(() => {

      /* Check Cooldown's Current Status */
      var currentDate = new Date()
      var cooldownDate = new Date(window.localStorage.getItem("cooldown"));
      checkCooldown(currentDate, cooldownDate);
      var cooldownInterval = '[' + new Date().toUTCString() + '] ';
      console.log("Checked Cooldown Status: " + cooldownInterval)

      /* Check API's Current Status */
      checkAPI();
      var apiInterval = '[' + new Date().toUTCString() + '] ';
      console.log("Checked API Status: " + apiInterval)

    }, 60000);
    return () => clearInterval(interval);

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
              var currentDate = new Date()
              var cooldownDate = new Date(currentDate.getTime() + 30 * 60000);
              window.localStorage.setItem("cooldown", cooldownDate);
              resolve(response);
            })
          }).catch((error) => {
            updateError("Invalid Access Token")
            reject(error);
          })
        })
        updateError("");
        updateSnapState(false);
        return response;
      }

      /* Ensure User has not Snapped Before */
      if (isSnapping === true) {
        if (cooldown === "") {
          performThanosSnap();
          var currentDate = '[' + new Date().toUTCString() + '] ';
          console.log("Attempted Thanos Snap: " + currentDate);
        }
      }

  /* Thanos Snap Dependencies */
}, [finalAPIKey, finalGroupID, isSnapping, cooldown]);

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
      console.log(response);
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
        updateError("Invalid Access Token")
      }
    });
  }

  /* Utility Function to Update Group Data*/
  function setAPIData(e) {
    if (e.key === 'Enter') {
      updateError("");
      updateGroups();
    }
  }

  /* Utility Function to Update Group Data*/
  function setAPIDataSecondary() {
    updateError("");
    updateGroups();
  }

  /* Function to Ensure that User has ONLY SNAPPED ONCE */
  function setThanosSnap() {
    updateError("");
    if (cooldown === "" && isSnapping === false) {
      updateSnapState(true)
    }
    else if (cooldown !== "") {
      updateError("You Have Already Performed a Successful Snap");
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
        <SnapError error={error} />
        <SnapModuleRow>
          <SnapModule>
            {/* Snap Functionality (1st Module) */}
            <SnapInstruction title={"Step 1: Enter your Access Token"} />
            <div className="thanosFirstModule">
              <div className="thanosFirstModuleInner">
                <input className="thanosFirstModuleInput"
                       placeholder={"Enter your GroupMe Access Token ..."}
                       onChange={e => setAPIKey(e.target.value)}
                       onKeyDown={setAPIData}/>
                <SnapButton title={"Submit"} function={setAPIDataSecondary} />
              </div>
            </div>
            <SnapText>{"Login to "}
              <a href="https://dev.groupme.com/">https://dev.groupme.com</a>
              {" and locate your 'Access Token'."}
            </SnapText>
            <SnapTextSecondary>
              {"Access Token: " + finalAPIKey}
            </SnapTextSecondary>
          </SnapModule>
          <SnapModule>
            {/* Snap Functionality (2nd Module) */}
            <SnapInstruction title={"Step 2: Select the Group to Snap"} />
            <div className="thanosSecondModule">
              <div className="thanosSecondModuleInner">
                <Select options={options} updateGroup={setGroupData}/>
              </div>
            </div>
            <SnapText>
              {"Group ID: " + finalGroupID}
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
