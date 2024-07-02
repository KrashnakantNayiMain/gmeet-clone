import React, { useEffect, useRef } from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useRecoilState, useRecoilValue } from "recoil";
import { audioControlStateSelector, videoControlStateSelector } from "../store/selectors/control";
import { controlsState } from "../store/atoms/control";

export const Video = ({ stream, pc, type }) => {
  const [controls, setControls] = useRecoilState(controlsState);

  const previousSrcObjectRef = useRef(null);

  useEffect(() => {
    if (type == "local" && stream.current) {
      const checkSrcObject = () => {
        if (stream.current.srcObject !== previousSrcObjectRef.current) {
          previousSrcObjectRef.current = stream.current.srcObject;
          if (stream.current.srcObject) {
            const tracks = stream.current.srcObject.getTracks();
            tracks.forEach((track) => {
              track.enabled = controls[track.kind];
            });
          }
        }
      };
      const intervalId = setInterval(checkSrcObject, 1);

      return () => clearInterval(intervalId);
    }
  }, [stream]);



  const toggleStreams = (kind) => {
    if (stream.current && stream.current.srcObject) {
      const tracks = stream.current.srcObject.getTracks();
      tracks.forEach((track) => {
        if (track.kind === kind) {
          track.enabled = !track.enabled;
          if (!track.enabled) {
            const sender = pc.getSenders().find((s) => s.track === track);
            console.log(sender);
            if (sender) {
              pc.removeTrack(sender);
            }
          } else {
            const newTrack = stream.current.srcObject.getTracks().find((t) => t.kind === kind);
            if (newTrack) {
              pc.addTrack(newTrack, stream.current.srcObject);
            }
          }
        }
      });

      setControls((prevControls) => ({
        ...prevControls,
        [kind]: !prevControls[kind],
      }));
    }
  };
  
  return (
    <div style={{ position: "relative" }}>
      <video
        style={{ borderRadius: 10 }}
        ref={stream}
        width="100%"
        height="100%"
        autoPlay
        playsInline
      />
      {type == "local" && <div style={{ 
        position: "absolute", 
        bottom: 10, 
        left: "50%", 
        transform: "translateX(-50%)",
        display: "flex",
        gap: "10px"
      }}>
        <AudioControl toggleStreams={toggleStreams} />
        <VideoControl toggleStreams={toggleStreams} />
      </div>}
    </div>
  );
};

function AudioControl({ toggleStreams }) {
  const audioControl = useRecoilValue(audioControlStateSelector);
  return(
    <Tooltip title={audioControl ? "Mute" : "Unmute"}>
      <IconButton onClick={() => toggleStreams('audio')} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        {audioControl ? <MicIcon style={{ color: "white" }} /> :  <MicOffIcon style={{ color: "white" }} />}
      </IconButton>
    </Tooltip>
  );
}

function VideoControl({ toggleStreams }) {
  const videoControl = useRecoilValue(videoControlStateSelector);
  return(
    <Tooltip title={videoControl ? "Stop" : "Start"}>
      <IconButton onClick={() => toggleStreams('video')} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        {videoControl ? <VideocamIcon style={{ color: "white" }} /> : <VideocamOffIcon style={{ color: "white" }} /> }
      </IconButton>
    </Tooltip>
  );
}