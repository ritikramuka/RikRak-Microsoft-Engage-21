import React from "react";
import {
  MdVideocam as CameraOn,
  MdVideocamOff as CameraOff,
  MdScreenShare as SharedScreen,
  MdMicNone as AudioOn,
  MdMicOff as AudioOff,
  MdMessage as ChatBox,
} from "react-icons/md";
import "./style/ControlBar.css";
import "./style/Buttons.css";

const ControlBar = ({
  clickChat,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  clickWord
}) => {
  return (
    <div className="ControlBar">
      <nav className="NavBottom">
        <div>
          <button
            className="Control-btn"
            onClick={toggleCameraAudio}
            data-switch="video"
          >
            {userVideoAudio.video ? (
              <CameraOn
                className="btn-svg"
                style={{ pointerEvents: "none" }}
              ></CameraOn>
            ) : (
              <CameraOff
                className="btn-svg"
                style={{ pointerEvents: "none" }}
              ></CameraOff>
            )}
          </button>
          <button
            className="Control-btn"
            onClick={toggleCameraAudio}
            data-switch="audio"
          >
            {userVideoAudio.audio ? (
              <AudioOn
                className="btn-svg"
                style={{ pointerEvents: "none" }}
              ></AudioOn>
            ) : (
              <AudioOff
                className="btn-svg"
                style={{ pointerEvents: "none" }}
              ></AudioOff>
            )}
          </button>
        </div>

        <div>
          <button className="Control-btn" onClick={clickScreenSharing}>
            <SharedScreen className="btn-svg"></SharedScreen>
          </button>
          <button className="Control-btn" onClick={clickChat}>
            <ChatBox className="btn-svg"></ChatBox>
          </button>
        </div>

        <div>
          <button className="Control-btn" onClick={clickWord}>
            <ChatBox className="btn-svg"></ChatBox>
          </button>
          <button className="End-Meeting" onClick={goToBack}>
            End Meeting
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ControlBar;
