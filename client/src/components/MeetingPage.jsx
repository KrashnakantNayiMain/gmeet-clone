import React, { useState, useEffect, useRef } from "react";
import "./css/MeetingPage.css";
import Footer from "./Footer";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Video } from "./Video";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};
const SERVER_URL = "http://localhost:3000";

function MeetingPage() {
  const [pc] = useState(new RTCPeerConnection(servers));
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const location = useLocation();
  const newMeeting = location.state?.newMeeting;

  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const params = useParams();
  const roomId = params.roomId;
  const navigate = useNavigate();

  if(localStorage.getItem('new-meeting') == null && localStorage.getItem('join-meeting')) {
    localStorage.setItem('join-meeting', 1);
  }

  useEffect(() => {
    const handleStartCam = async () => {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      if (localStreamRef.current) {
        localStreamRef.current.srcObject = stream;
      }
    };

    handleStartCam();

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });

      if (remoteStreamRef.current) {
        remoteStreamRef.current.srcObject = remoteStream;
      }
    };

    pc.onicecandidate = ({ candidate }) => {
      console.log('Candidate added.');
      if (candidate && socket) {
        socket.emit("iceCandidate", { addCandidate: candidate, roomId });
      }
    };

  }, [pc, socket, roomId, remoteStream]);

  useEffect(() => {
    const s = io.connect(SERVER_URL, {
      transports: ['websocket']
    });

    s.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    s.on("connect", () => {
      s.emit("join-call", { roomId });
    });

    s.on("get-answer-and-save-remote", async ({ description }) => {
      try {
        if(!pc.remoteDescription) {
          await pc.setRemoteDescription(description);
        }
      } catch (error) {
        console.error("Error setting get-answer-and-save-remote:", error);
      }
    });

    s.on("set-offer-and-send-answer", async ({ description }) => {
      try {
        if(!pc.remoteDescription) {
          await pc.setRemoteDescription(description);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          s.emit("send-answer", { description: pc.localDescription, roomId });
        }
      } catch (error) {
        console.error("Error setting get-offer-and-send-answer:", error);
      }
    });

    s.on("iceCandidateReply", async ({ candidate }) => {
      if (candidate) {
        try {
          await pc.addIceCandidate(candidate);
        } catch (error) {
          console.error("Error adding received ice candidate:", error);
        }
      }
    });

    setSocket(s);
  }, [pc, roomId]);

  useEffect(() => {
    if (socket && localStream) {
      (async () => {
        if (localStorage.getItem('new-meeting')) {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          await socket.emit("save-offer", { description: pc.localDescription, roomId });
        } else {
          await socket.emit("get-offer-and-save-in-current-socket", { roomId });
        }
      })();
    }
  }, [socket, localStream, pc, roomId]);

  return (
    <div className="meeting-room">
      <div className="video-section">
        <div className="video-stream local">
          <Video stream={localStreamRef} />
        </div>
        <div className="video-stream remote">
          <Video stream={remoteStreamRef} />
        </div>
      </div>
      <div className="controls-section">
        <button className="control-button">Mute</button>
        <button className="control-button">Unmute</button>
        <button className="control-button" onClick={() => navigate("/")}>
          Leave Meeting
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default MeetingPage;
