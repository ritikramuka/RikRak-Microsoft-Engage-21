import React from "react";
import Icon1 from "../Images/Video_call.svg";
import Icon2 from "../Images/fast_loading.svg";
import Icon3 from "../Images/server_cluster.svg";
import "./style/Services.css";

const Services = () => {
  return (
    <div className="ServicesContainer" id="services">
      <h1 className="ServicesH1">Our Services</h1>
      <div className="ServicesWrapper">
        <div className="ServicesCard">
          <img className="ServicesIcon" src={Icon1} alt="" />
          <h2 className="ServicesH2">Best Video Quality</h2>
          <p className="ServicesP">
            State of the art video compression combined with our scaling
            optimization makes your calls crystal clear.
          </p>
        </div>
        <div className="ServicesCard">
          <img className="ServicesIcon" src={Icon2} alt="" />
          <h2 className="ServicesH2">Lowest Latency</h2>
          <p className="ServicesP">
            Breakthrough simple peer WebRTC technology means your video goes
            directly to the other person without a server. No middleman. No
            extra stops.
          </p>
        </div>
        <div className="ServicesCard">
          <img className="ServicesIcon" src={Icon3} alt="" />
          <h2 className="ServicesH2">No Server Needed</h2>
          <p className="ServicesP">
            Video Calls are entirely between you and your caller, decentralized from
            any server. Call data never leaves the browser. Cool right?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
