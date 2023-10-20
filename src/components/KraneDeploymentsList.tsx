import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography, useTheme, Box, Modal, Checkbox } from "@mui/material";
const { ipcRenderer } = require("electron");
import SideNav from "./Sidebar.js";
import LaunchIcon from "@mui/icons-material/Launch";
import { RadioButtonUnchecked } from "@mui/icons-material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { styled } from "@mui/material/styles";
import { JsxElement } from "typescript";
import SortIcon from "@mui/icons-material/Sort";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.mode === "dark" ? "#5c4d9a" : "#8383de",
    color: "white",
    fontSize: 11,
  },
}));

type ArrPodObjs = {
  name: string;
  ready: string;
  status: string;
  restarts: string;
  lastRestart: string;
  age: string;
  CpuPercent: number;
  memoryPercent: number;
};

// let filteredPods: any = [];

function KraneDeploymentsList(props) {
  const theme = useTheme();

  let currDir = props.currDir;

  //Listen to "get deployments" return event and set pods array
  ipcRenderer.on("got_deployments", (event, arg) => {
    let argArr = arg.split("");
    console.log("argArr is", argArr);

    let filteredDeployments = [];

    let i: number = 0;

    //skip row of column titles
    while (arg[i] !== "\n") {
      i++;
    }
    i++;

    for (let j = 0; i < argArr.length; i++) {
      let nameOutput: any = [];
      let readyNumeratorOutput: any = [];
      let readyDenominatorOutput: any = [];
      let upToDateOutput: any = [];
      let availableOutput: any = [];
      let ageOutput: any = [];
      let containersOutput: any = [];
      let imagesOutput: any = [];
      let selectorOutput: any = [];

      //saves name
      while (arg[i] !== " ") {
        nameOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }

      //saves ready
      while (arg[i] !== "/") {
        readyNumeratorOutput.push(arg[i]);
        i++;
      }
      i++;
      while (arg[i] !== " ") {
        readyDenominatorOutput.push(arg[i]);
        i++;
      }

      //skips spaces
      while (arg[i] === " ") {
        i++;
      }

      //saves up-to-date
      while (arg[i] !== " ") {
        upToDateOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }

      //saves available
      while (arg[i] !== " ") {
        availableOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }
      //saves age
      while (arg[i] !== " ") {
        ageOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }
      //saves containers
      while (arg[i] !== " ") {
        containersOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }

      //saves images
      while (arg[i] !== " ") {
        imagesOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }

      //saves selector
      while (arg[i] !== "\n") {
        selectorOutput.push(arg[i]);
        i++;
      }

      let deployment = {
        index: j,
        name: nameOutput.join(""),
        readyNumerator: Number(readyNumeratorOutput.join("")),
        readyDenominator: Number(readyDenominatorOutput.join("")),
        upToDate: Number(upToDateOutput.join("")),
        available: Number(availableOutput.join("")),
        age: ageOutput.join(""),
        containers: containersOutput.join(""),
        images: imagesOutput.join(""),
        selector: selectorOutput.join(""),
        replicaSets: [],
      };

      filteredDeployments.push(deployment);
      j++;
    } //end of for loop parsing deployments return
    props.setDeploymentsArr(filteredDeployments);
    // console.log("deployments Arr is:", deploymentsArr);
  }); //--------------------------------------end of ipc to parse deployments --------

  //Listen to "get replicaSets" return event and set pods array
  ipcRenderer.on("got_rs", (event, arg) => {
    let argArr = arg.split("");
    // console.log("argArr RS is", argArr);

    let filteredReplicaSets = [];

    let i: number = 0;

    //skip row of column titles
    while (arg[i] !== "\n") {
      i++;
    }
    i++;

    for (let j = 0; i < argArr.length; i++) {
      let nameOutput: any = [];
      let desiredOutput: any = [];
      let currentOutput: any = [];
      let availableOutput: any = [];
      let ageOutput: any = [];
      let containersOutput: any = [];
      let imagesOutput: any = [];
      let selectorOutput: any = [];

      //saves name
      while (arg[i] !== " ") {
        nameOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }

      //saves desired
      while (arg[i] !== " ") {
        desiredOutput.push(arg[i]);
        i++;
      }

      //skips spaces
      while (arg[i] === " ") {
        i++;
      }

      //saves current
      while (arg[i] !== " ") {
        currentOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }

      //saves available
      while (arg[i] !== " ") {
        availableOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }
      //saves age
      while (arg[i] !== " ") {
        ageOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }
      //saves containers
      while (arg[i] !== " ") {
        containersOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }

      //saves images
      while (arg[i] !== " ") {
        imagesOutput.push(arg[i]);
        i++;
      }
      //skips spaces
      while (arg[i] === " ") {
        i++;
      }

      //saves selector
      while (arg[i] !== "\n") {
        selectorOutput.push(arg[i]);
        i++;
      }

      let replicaSet = {
        index: j,
        name: nameOutput.join(""),
        desired: desiredOutput.join(""),
        current: currentOutput.join(""),
        available: availableOutput.join(""),
        age: ageOutput.join(""),
        containers: containersOutput.join(""),
        images: imagesOutput.join(""),
        selector: selectorOutput.join(""),
      };

      filteredReplicaSets.push(replicaSet);
      j++;
    } //end of for loop parsing replicaSets return

    //add each replicaSet to its deployment
    let tempDeploys = [...props.deploymentsArr];
    for (let i = 0; i < tempDeploys.length; i++) {
      tempDeploys[i]["replicaSets"] = filteredReplicaSets[i];
    }

    //set new deployments Arr state
    props.setDeploymentsArr(tempDeploys);
    console.log("deployments Arr is:", props.deploymentsArr);
  }); //--------------------------------------end of ipc to parse replicaSets --------

  useEffect(() => {
    props.getDeploymentsInfo();
  }, []);

  let deploymentsList = [];
  for (let i = 0; i < props.deploymentsArr.length; i++) {
    deploymentsList.push(
      <>
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Outfit",
            fontWeight: "400",
            fontSize: "17px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            textAlign: "left",
            width: "auto",
            margin: "17px 50px 0 20px",
            padding: "0 0 0px 0",
            letterSpacing: "1px",
            color: theme.palette.mode === "dark" ? "#8f85fb" : "#9075ea",
            textShadow:
              theme.palette.mode === "dark"
                ? "1px 1px 2px black"
                : "1px 1px 1px #00000000",
            userSelect: "none",
            // border:"1px solid red"
          }}
        >
          DEPLOYMENT {i + 1}
          <Button
            key={i}
            id="podButt"
            // onClick={() => handleDeploymentOpen(props.deploymentsArr[i])}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "450px",
              height: "118px",
              fontSize: "16px",
              // border: "1px solid white",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "space-between",
              margin: "2px 0 0 0",
              padding: "15px 0px 0px 0px",
              color: theme.palette.mode === "dark" ? "white" : "grey",
              border:
                theme.palette.mode === "dark"
                  ? "1.3px solid white"
                  : "1.3px solid #00000025",
              borderRadius: "5px",
              boxShadow:
                theme.palette.mode === "dark" ? "10px 9px 2px #00000060" : "",
              background:
                theme.palette.mode === "dark" ? "#0e0727" : "#e6e1fb80",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "440px",
                justifyContent: "flex-start",
                // border: "1px solid green",
              }}
            >
              <img
                style={{
                  width: "40px",
                  marginRight: "0px",
                  marginLeft: "10.8px",
                  // border: "1px solid blue",
                }}
                src="../../public/deploy-2.svg"
              ></img>
              <span
                style={{
                  margin: "0px 0 0 15px",
                  width: "360px",
                  lineHeight: "23px",
                  fontSize: "18px",
                  textTransform: "none",
                  // border: "1px solid blue",
                }}
              >
                {props.deploymentsArr[i]["name"]}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                  alignItems: "flex-end",
                  justifyContent: "right",
                  margin: "0px 10px 0 10px",

                  // border: "1px solid blue",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "15px",
                    backgroundColor: "green",
                    //   theme.palette.mode === "dark"
                    //     ? `${nodeReadyStatusRunning}`
                    //     : `${nodeReadyStatusRunningLight}`,
                    justifyContent: "right",
                    // margin: "0px 0 2px 0",
                    // border: ".5px solid white",
                  }}
                ></div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "12px",
                marginLeft: "70px",
                justifyContent: "flex-start",
                alignItems: "start",
                // border: ".5px solid white",
                width: "380px",
                height: "40px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  textTransform: "none",
                  margin: "0 20px 0 0px",
                }}
              >
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: "500",
                    margin: "-6px 0 0px 0",
                  }}
                >
                  {props.deploymentsArr[i]["age"].toLowerCase()}
                </div>
                <div style={{ fontSize: "10px", margin: "-4px 0 0 0" }}>
                  AGE
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  textTransform: "none",
                  margin: "0 25px 0 20px",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "500",
                    margin: "-8.9px 0 0px -10px",
                  }}
                >
                  {props.deploymentsArr[i]["upToDate"]}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    margin: "-6px 0 0 0",
                    width: "70px",
                  }}
                >
                  UP-TO-DATE
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  textTransform: "none",
                  margin: "0 20px 0 15px",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "500",
                    margin: "-8.9px 0 0px 0",
                  }}
                >
                  {props.deploymentsArr[i]["available"]}
                </div>
                <div style={{ fontSize: "10px", margin: "-6px 0 0 0" }}>
                  AVAILABLE
                </div>
              </div>
              <div
                style={{
                  display:"flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "none",
                  margin: "-27px 0px 0 20px",
                  fontSize: "36px", 
                  fontWeight: "200",
                }}
              >
                {props.deploymentsArr[i]["readyNumerator"]}
                 / 
                 {props.deploymentsArr[i]["readyDenominator"]}
                <div style={{ fontSize: "10px",fontWeight: "500", margin: "-12.5px 0px 0 0px" }}>
                  READY
                </div>
              </div>
              {/* <div
                style={{
                  
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  textTransform: "none",
                  margin: "0 20px 0 20px",
                }}
              >
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "500",
                    margin: "-23px 0 0px 0px",
                  }}
                >
                  {props.deploymentsArr[i]["readyNumerator"]} 
                  
                  </div> 
                  <div
                  style={{
                    position:"relative",
                    top:"-40px",
                    left:"20px",
                    fontSize: "25px",
                    fontWeight: "500",
                    // margin: "-40px 0 0px 20px",
                  }}
                >
                  /</div>
                  <div
                  style={{
                    position:"relative",
                    top:"-75px",
                    left:"35px",
                    fontSize: "25px",
                    fontWeight: "500",
                    // margin: "-40px 0 0px 50px",
                  }}
                >
                  {props.deploymentsArr[i]["readyDenominator"]}
                  
                </div>
                <div style={{ fontSize: "10px", position:"relative",
                    top:"-75px",
                    left:"20px", margin: "-11px 0 0 -12px" }}>
                  READY
                </div>
              </div> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  fontSize: "10px",
                  margin: "0px 0 0 20px",
                  // color: "#2fc665",
                  // color:
                  //   theme.palette.mode === "dark"
                  //     ? `${nodeReadyStatusRunning}`
                  //     : `${nodeReadyStatusRunningLight}`,
                }}
              ></div>
            </div>
          </Button>
        </div>
      </>
    );
  }

  let deploymentsListDiv;
  deploymentsListDiv = (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "-10px 0 0 68px",
          // height: "34px",
          // width: "260%",
          // border: "1px solid red",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontFamily: "Outfit",
              fontSize: "24px",
              fontWeight: "900",
              letterSpacing: "3px",
              // border: "1px solid white",
              textAlign: "left",
              // color: "#ffffff",
              paddingTop: "0px",
              color: theme.palette.mode === "dark" ? "" : "#6d6fb4",
              userSelect: "none",
            }}
          >
            DEPLOYMENTS
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "13px 0 0 8px",
              fontSize: "12px",
              userSelect: "none",
            }}
          >
            ( {props.deploymentsArr.length} total )
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          margin: "0 0 0 68px",
          width: "171%",
        }}
      >
        <div
          style={{
            height: "1px",
            width: "70%",
            backgroundColor:
              theme.palette.mode === "dark" ? "#ffffff99" : "#6d6fb4",
            // marginRight: "50px",
            marginTop: "0px",
          }}
        ></div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "-5px 0 0 50px",
          // border: "1px solid blue",
          width: "100%",
        }}
      >
        {deploymentsList}
      </div>
    </>
  );

  return (
    <>
      {/* ----------------MAIN CONTENT---------------- */}

      <div
        data-height="100%"
        // spacing={1}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          overflow: "hidden",
          alignItems: "flex-start",
          marginLeft: "0px",
          marginTop: "-18px",
          marginBottom: "50px",
          textAlign: "center",
          width: "95.5%",
          height: "auto",
          // border: "1px solid green",
          // overflow:"scroll"
        }}
      >
        <div>{deploymentsListDiv}</div>
      </div>
    </>
  );
}

export default KraneDeploymentsList;
