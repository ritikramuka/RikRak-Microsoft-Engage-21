import React from "react";
import {
  MdVideocam as CameraOn,
  MdVideocamOff as CameraOff,
  MdScreenShare as SharedScreen,
  MdMicNone as AudioOn,
  MdMicOff as AudioOff,
  MdMessage as ChatBox,
  MdBrush
} from "react-icons/md";
import { SiMicrosoftword } from "react-icons/si";
import { ImPhoneHangUp } from "react-icons/im";
import "./style/ControlBar.css";
import "./style/Buttons.css";

const ControlBar = ({
  clickChat,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  clickWord,
  clickBoard
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
          <button className="Control-btn" onClick={clickScreenSharing}>
            <SharedScreen className="btn-svg"></SharedScreen>
          </button>
          <button className="End-Meeting" onClick={goToBack}>
            <ImPhoneHangUp className="btn-svg"></ImPhoneHangUp>
          </button>
          <button className="Control-btn" onClick={clickChat}>
            <ChatBox className="btn-svg"></ChatBox>
          </button>
          <button className="Control-btn" onClick={clickBoard}>
            <MdBrush className="btn-svg"></MdBrush>
          </button>
          <button className="Control-btn" onClick={clickWord}>
            <SiMicrosoftword className="btn-svg"></SiMicrosoftword>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ControlBar;
