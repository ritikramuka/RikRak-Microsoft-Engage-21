import React, { useRef, useState, useEffect } from "react";
import "./style/HomeScreen.css";
import socket from "../Sockets/socket";
import "../components/style/Buttons.css";
import Video from "../videos/video.mp4";
import Header from "../components/Header";

const HomeScreen = (props) => {
    const roomNameRef = useRef();
    const userNameRef = useRef();
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        socket.on("errorHasUser", ({ error }) => {
            if (!error) {
                const roomName = roomNameRef.current.value;
                const userName = userNameRef.current.value;

                sessionStorage.setItem("user", userName);
                props.history.push(`/room/${roomName}`);
            } else {
                setErr(error);
                setErrMsg("User name already exist");
            }
        });
    }, [props.history]);

    function join() {
        const roomName = roomNameRef.current.value;
        const userName = userNameRef.current.value;

        if (!roomName || !userName) {
            setErr(true);
            if (roomName) setErrMsg("Enter User Name Also");
            else if (userName) setErrMsg("Enter Room Name Also");
            else setErrMsg("Enter Room Name or User Name");
        } else {
            socket.emit("hasUser", { roomId: roomName, userName });
        }
    }

    return (
        <>
            <Header></Header>
            <div className="HomeContainer" id="home">
                <div className="HomeBg">
                    <video
                        className="VideoBg"
                        autoPlay
                        loop
                        muted
                        src={Video}
                        type="video/mp4"
                    />
                </div>
                <div className="HomeContent">
                    <h1 className="HomeH1">Pick name.</h1>
                    <h1 className="HomeH1">Share name.</h1>
                    <h1 className="HomeH1">Start chatting.</h1>
                    <p className="HomerP">
                        Each call has its own room name. Just pick a room name and share with
                        your friends. It's really that easy.
                    </p>
                    <div className="HomeInputWrapper">
                        <div className="InputContainer">
                            <div className="InputColumn1">
                                <h2 className="HomeH2">Pick a room name.</h2>
                                <h2 className="HomeH2">How about this one?</h2>
                            </div>
                            <div className="InputColumn2">
                                <form className="InputForm">
                                    <input
                                        className="Input"
                                        type="text"
                                        ref={roomNameRef}
                                        placeholder="Room name"
                                        required
                                    />
                                    <input
                                        className="Input"
                                        type="text"
                                        ref={userNameRef}
                                        placeholder="User name"
                                        required
                                    />
                                    <button
                                        className="Button SubmitSecondary small fontSmall"
                                        type="button"
                                        onClick={join}
                                    >
                                        Go to my Call
                                    </button>
                                    {err && <span className="Text Error">{errMsg}</span>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeScreen;
