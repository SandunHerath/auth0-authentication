import { ZoomMtg } from "@zoomus/websdk";
import { useEffect } from "react";

import crypto from "crypto"; // crypto comes with Node.js

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
    "base64"
  );
  const hash = crypto
    .createHmac("sha256", apiSecret)
    .update(msg)
    .digest("base64");
  const signature = Buffer.from(
    `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
  ).toString("base64");

  return signature;
}

var apiKey = "MRHFx3gaTx2w0S4MaHwJaQ";
var API_SECRET = "Qk5DyjyBym0jnLWYPDGpzqU9CPzlp8UQ51s6";
var meetingNumber = parseInt(localStorage.getItem("meeting_id"));
var role = 1;
var leaveUrl = "http://localhost:3000/class";
var userName = localStorage.getItem("username");
var userEmail = localStorage.getItem("email");
var passWord = localStorage.getItem("meeting_pw");
var signature = generateSignature(apiKey, API_SECRET, meetingNumber, role);
console.log(signature);
//const url = `http://localhost:9999/meeting.html?name=${userName}&mn=${meetingNumber}&email=${userEmail}&pwd=${passWord}&role=${role}&lang=en-US&signature=${signature}&china=0&apiKey=${apiKey}`;

const Zoom = () => {
  useEffect(() => {
    showZoomIV();
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.9/lib", "/av");
    //ZoomMtg.setZoomJSLib("node_modules/@zoomus/websdk/dist/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    InitiateMeeting();
    // view();
  }, []);

  const showZoomIV = () => {
    document.getElementById("zmmtg-root").style.display = "block";
  };
  const InitiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  return <div className="App">Zoom</div>;
};

export default Zoom;
