import { useEffect, useRef } from "react";

export const Video = ({ stream }) => {
  return (
    <div>
      <div>
        <video
          style={{ borderRadius: 10 }}
          ref={stream}
          muted
          width="100%"
          height="100%"
          autoPlay={true}
          playsInline={true}
        />
      </div>
    </div>
  );
};
