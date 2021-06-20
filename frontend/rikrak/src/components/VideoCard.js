import React, { useEffect, useRef } from "react";

const VideoCard = (props) => {
    const ref = useRef();
    const peer = props.peer;

    useEffect(() => {
        peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        });
        peer.on("track", (track, stream) => { });
    }, [peer]);

    return <video className="MyVideo" playsInline autoPlay ref={ref} />;
};

export default VideoCard;
