import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./css/LandingPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Video } from "./Video";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

export default function LandingPage() {
  const [pc] = useState(new RTCPeerConnection(servers));
  const [code, setCode] = useState("");
  const navigator = useNavigate();

  const localStreamRef = useRef(null);

  const handleNewMeeting = () => {
    localStorage.setItem('new-meeting', 1);
    navigator("/meeting/" + uuidv4(), { state: { newMeeeting: true } });
  };
  const handleJoin = () => {
    if (code) {
      localStorage.setItem('join-meeting', 1);
      navigator("/meeting/" + code, { state: { newMeeeting: false } });
    }
  };

  useEffect(() => {
    localStorage.removeItem('new-meeting');
    localStorage.removeItem('join-meeting');

    const startCam = async () => {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      if (localStreamRef.current) {
        localStreamRef.current.srcObject = stream;
      }
    };
    startCam();

    return () => {
      if (localStreamRef.current && localStreamRef.current.srcObject) {
        localStreamRef.current.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <Box sx={{ flexGrow: 1 }} style={{ height: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            style={{ height: "100%" }}
          >
            <Grid item xs={6}>
              <Video stream={localStreamRef} pc={pc} type="local"></Video>
            </Grid>
            <Grid item xs={6} style={{ height: "100%" }}>
              <div className="main-content" style={{ height: "100%" }}>
                <h1>Premium video meetings. Now free for everyone.</h1>
                <p>
                  We re-engineered the service we built for secure business
                  meetings, Google Meet, to make it free and available for all.
                </p>
                <div className="main-actions">
                  <button onClick={handleNewMeeting}>New Meeting</button>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter a meeting code"
                  />
                  <button onClick={handleJoin} disabled={!code}>
                    Join
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </main>
      <Footer />
    </>
  );
}
