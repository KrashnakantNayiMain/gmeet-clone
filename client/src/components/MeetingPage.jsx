import React, { useState, useEffect, useRef } from "react";
import "./css/MeetingPage.css";
import Footer from "./Footer";
import { useParams, useNavigate } from "react-router-dom";
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
  const [localStream, setLocalSteram] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());

  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const params = useParams();
  const roomId = params.roomId;

  const handleStartCam = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalSteram(stream);

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    if (localStreamRef.current) {
      localStreamRef.current.srcObject = stream;
    }

    if(socket){
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("send-offer", { description: pc.localDescription, roomId});
    }
  };

  useEffect(() => {
    const socket = io.connect(SERVER_URL, {
      transports: ['websocket']
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("connect", () => {
      socket.emit("join-call", { roomId });
    });
    setSocket(socket);

    socket.on("accept-offer", async ({ currentCandidate, description}) => {
      console.log("acccept offer ", currentCandidate, socket.id);
      if(currentCandidate != socket.id) {
        try {
          if (description.type === 'offer') {
            await pc.setRemoteDescription(description);
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socket.emit("send-answer", { description: pc.localDescription });
          } else if (description.type === 'answer') {
            await pc.setRemoteDescription(description);
          }
        } catch (error) {
          console.error("Error setting local/remote description when accepting offer:", error);
        }
      }
    });
  }, [roomId]);

  return (
    <div className="meeting-room">
      <div className="video-section">
        <div className="video-stream local">
          <Video stream={localStreamRef} />
        </div>
        <div className="video-stream remote">
          {/* {remoteStream && <Video stream={remoteStreamRef} />} */}
        </div>
      </div>
      <div className="controls-section">
        {!localStream && (
          <button className="control-button" onClick={handleStartCam}>
            Start Camera
          </button>
        )}
        {/* <button className="control-button">Mute</button>
        <button className="control-button">Unmute</button>
        <button className="control-button" onClick={(e) => navigator("/")}>
          Leave Meeting
        </button> */}
      </div>
      <Footer />
    </div>
  );
}

export default MeetingPage;
