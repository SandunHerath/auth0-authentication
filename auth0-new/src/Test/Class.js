// import meeting from "./meeting.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Class.css";
import React, { useState } from "react";
import Zoom from "./Zoom";
import axios from "axios";

function Class() {
  const [username, setUsername] = useState("");
  const [joinMeeting, setJoinMeeting] = useState(false);
  console.log(joinMeeting);
  const zoomMeeting = () => {
    const data = {
      email: "sandunherath124@gmail.com",
      username: username,
    };
    console.log(username);
    axios
      .post(`http://localhost:3444/meeting`, data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("meeting_pw", response.data.meeting_password);
        localStorage.setItem("email", data.email);
        localStorage.setItem("meeting_id", response.data.meeting_id);
        localStorage.setItem("username", data.username);
        // let URL =
        //   response.data.join_url.replaceAll(
        //     "https://us04web.zoom.us/j/",
        //     "http://localhost:9999/?"
        //   ) + `?role=1?name=${username}`;
        // console.log(URL);
        // window.location.replace(`${URL}`);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="App">
      {joinMeeting ? (
        <iframe width={200} height={200} title="Zoom Class">
          <Zoom />
        </iframe>
      ) : (
        <header className="App-header">
          {/* <Student /> */}
          <h1>Zoom Meeting</h1>
          <div className="card">
            <h5>
              Name&nbsp;&nbsp;
              <input
                type="text"
                name="name"
                style={{
                  width: "300px",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  fontSize: "18px",
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </h5>

            <div className="row" style={{ margin: "10px" }}>
              <div className="column">
                <div
                  className="row"
                  style={{ margin: "10px", marginTop: "120px" }}
                >
                  <button
                    className="btn btn-info"
                    style={{
                      width: "290px",
                      height: "80px",
                      fontSize: "20px",
                      fontFamily: "cursive",
                    }}
                    onClick={zoomMeeting}
                  >
                    Create Meeting
                  </button>
                </div>
              </div>
              <div className="column" style={{ float: "right" }}>
                <img
                  src="\meeting.png"
                  height="330px"
                  width="400px"
                  style={{
                    margin: "10px",
                    borderRadius: "50px",
                  }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <button
            style={{ border: "1px solid #fff" }}
            onClick={() => setJoinMeeting(true)}
          >
            Join Meeting
          </button>
        </header>
      )}
    </div>
  );
}

export default Class;
