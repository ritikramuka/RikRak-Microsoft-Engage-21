import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  CameraVideoOff,
  CameraVideo,
  MicMute,
  Mic,
  WindowDock,
  ChatRightText,
} from "react-bootstrap-icons";

const ControlBar = ({
  clickChat,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
}) => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        {/* left */}
        <Nav>
          <Button onClick={toggleCameraAudio} data-switch="video">
            {userVideoAudio.video ? (
              <CameraVideo></CameraVideo>
            ) : (
              <CameraVideoOff></CameraVideoOff>
            )}
          </Button>
          <Button onClick={toggleCameraAudio} data-switch="audio">
            {userVideoAudio.audio ? <Mic></Mic> : <MicMute></MicMute>}
          </Button>
        </Nav>

        {/* centre */}
        <Nav className="mx-auto">
          <Button onClick={clickScreenSharing}>
            <WindowDock></WindowDock>
          </Button>
          <Button onClick={clickChat}>
            <ChatRightText></ChatRightText>
          </Button>
        </Nav>

        {/* right */}
        <Nav className="justify-content-end">
          <Button variant="danger" onClick={goToBack}>
            End Meeting
          </Button>
        </Nav>
      </Navbar>
    </div>
  );
};

export default ControlBar;
