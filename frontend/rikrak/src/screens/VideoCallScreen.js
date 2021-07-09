import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import socket from "../Sockets/socket";
import VideoCard from "../components/VideoCard";
import ControlBar from "../components/ControlBar";
import Chat from "../components/Chat";
import "./style/VideoCallScreen.css";
import WordScreen from "../components/WordScreen";
import Board from "../components/Board";

const VideoCallScreen = (props) => {
    const currentUser = sessionStorage.getItem("user");
    const [peers, setPeers] = useState([]);

    const [displayChat, setDisplayChat] = useState(false);
    const [displayWord, setDisplayWord] = useState(false);
    const [displayBoard, setDisplayBoard] = useState(false);

    const [screenShare, setScreenShare] = useState(false);
    const [userVideoAudio, setUserVideoAudio] = useState({
        localUser: { video: true, audio: true },
    });

    const peersRef = useRef([]);
    const userVideoRef = useRef();
    const screenTrackRef = useRef();
    const userStream = useRef();
    const roomId = props.match.params.roomId;

    // Simple-Peer
    // Make New Server
    function createPeer(userId, caller, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("callUser", {
                userToCall: userId,
                from: caller,
                signal,
            });
        });
        peer.on("disconnect", () => {
            peer.destroy();
        });

        return peer;
    }

    function addPeer(incomingSignal, callerId, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("attendCall", { signal, to: callerId });
        });
        peer.on("disconnect", () => {
            peer.destroy();
        });
        peer.signal(incomingSignal);

        return peer;
    }

    function findPeer(id) {
        return peersRef.current.find((p) => p.peerID === id);
    }

    useEffect(() => {
        // End Meeting Button Event
        window.addEventListener("popstate", goToBack);

        // Connect Camera & Mic
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                userVideoRef.current.srcObject = stream;
                userStream.current = stream;

                socket.emit("joinRoom", { roomId, userName: currentUser });
                socket.on("userJoin", (users) => {
                    // for all users
                    const peers = [];
                    users.forEach(({ userId, info }) => {
                        let { userName, video, audio } = info;
                        if (userName !== currentUser) {
                            const peer = createPeer(userId, socket.id, stream);

                            peer.userName = userName;
                            peer.peerID = userId;

                            peersRef.current.push({
                                peerID: userId,
                                peer,
                                userName,
                            });
                            peers.push(peer);

                            setUserVideoAudio((previousList) => {
                                return {
                                    ...previousList,
                                    [peer.userName]: { video, audio },
                                };
                            });
                        }
                    });
                    setPeers(peers);
                });

                socket.on("recieveCall", ({ signal, from, info }) => {
                    let { userName, video, audio } = info;
                    const peerIdx = findPeer(from);

                    if (!peerIdx) {
                        const peer = addPeer(signal, from, stream);

                        peer.userName = userName;

                        peersRef.current.push({
                            peerID: from,
                            peer,
                            userName: userName,
                        });

                        setPeers((users) => {
                            return [...users, peer];
                        });
                        setUserVideoAudio((previousList) => {
                            return {
                                ...previousList,
                                [peer.userName]: { video, audio },
                            };
                        });
                    }
                });

                socket.on("callAttended", ({ signal, answerId }) => {
                    const peerIdx = findPeer(answerId);
                    peerIdx.peer.signal(signal);
                });

                socket.on("userLeft", ({ userId, userName }) => {
                    const peerIdx = findPeer(userId);
                    peerIdx.peer.destroy();
                    setPeers((users) => {
                        users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
                        return [...users];
                    });
                });
            });

        socket.on("toggleCamera", ({ userId, switchTarget }) => {
            const peerIdx = findPeer(userId);

            setUserVideoAudio((previousList) => {
                let video = previousList[peerIdx.userName].video;
                let audio = previousList[peerIdx.userName].audio;

                if (switchTarget === "video") video = !video;
                else audio = !audio;

                return {
                    ...previousList,
                    [peerIdx.userName]: { video, audio },
                };
            });
        });

        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line
    }, []);

    // Participants Video
    function createParticipantVideo(peer, index, arr) {
        return (
            <div
                className={`width-peer${peers.length > 8 ? "" : peers.length} VideoBox`}
                onClick={expandScreen}
                key={index}
            >
                {displayUserName(peer.userName)}
                <VideoCard key={index} peer={peer} number={arr.length} />
            </div>
        );
    }

    // Display User Name When Video not available
    function displayUserName(userName, index) {
        if (userVideoAudio.hasOwnProperty(userName)) {
            if (!userVideoAudio[userName].video) {
                return (
                    <div className="UserName" key={userName}>
                        {userName}
                    </div>
                );
            }
        }
    }

    // Open Chat
    const clickChat = (e) => {
        e.stopPropagation();
        setDisplayChat(!displayChat);
    };

    // Open Word
    const clickWord = (e) => {
        e.stopPropagation();
        setDisplayWord(!displayWord);
    };

    // Open Board
    const clickBoard = (e) => {
        e.stopPropagation();
        setDisplayBoard(!displayBoard);
    };

    // End Meeting
    const goToBack = (e) => {
        e.preventDefault();
        socket.emit("leaveRoom", { roomId, leaver: currentUser });
        sessionStorage.removeItem("user");
        window.location.href = "/";
    };

    // Toggle Camera and Audio Event
    const toggleCameraAudio = (e) => {
        const target = e.target.getAttribute("data-switch");

        setUserVideoAudio((previousList) => {
            let videoSwitch = previousList["localUser"].video;
            let audioSwitch = previousList["localUser"].audio;
            if (target === "video") {
                const userVideoTrack =
                    userVideoRef.current.srcObject.getVideoTracks()[0];
                videoSwitch = !videoSwitch;
                userVideoTrack.enabled = videoSwitch;
            } else {
                const userAudioTrack =
                    userVideoRef.current.srcObject.getAudioTracks()[0];
                audioSwitch = !audioSwitch;
                if (userAudioTrack) {
                    userAudioTrack.enabled = audioSwitch;
                } else {
                    userStream.current.getAudioTracks()[0].enabled = audioSwitch;
                }
            }

            return {
                ...previousList,
                localUser: { video: videoSwitch, audio: audioSwitch },
            };
        });

        socket.emit("cameraAudioLever", { roomId, switchTarget: target });
    };

    // ScreenShare Event
    const clickScreenSharing = () => {
        if (!screenShare) {
            navigator.mediaDevices
                .getDisplayMedia({ cursor: true })
                .then((stream) => {
                    const screenTrack = stream.getTracks()[0];

                    peersRef.current.forEach(({ peer }) => {
                        peer.replaceTrack(
                            peer.streams[0]
                                .getTracks()
                                .find((track) => track.kind === "video"),
                            screenTrack,
                            userStream.current
                        );
                    });

                    // ShareScreen End Listner
                    screenTrack.onended = () => {
                        peersRef.current.forEach(({ peer }) => {
                            peer.replaceTrack(
                                screenTrack,
                                peer.streams[0]
                                    .getTracks()
                                    .find((track) => track.kind === "video"),
                                userStream.current
                            );
                        });
                        userVideoRef.current.srcObject = userStream.current;
                        setScreenShare(false);
                    };

                    userVideoRef.current.srcObject = stream;
                    screenTrackRef.current = screenTrack;
                    setScreenShare(true);
                });
        } else {
            screenTrackRef.current.onended();
        }
    };

    // FullScrenn View
    const expandScreen = (e) => {
        const elem = e.target;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    };

    return (
        <div className="RoomContainer">
            <div className="VideoAndBarContainer">
                <div className="VideoContainer">
                    <div
                        className={`width-peer${peers.length > 8 ? "" : peers.length
                            } VideoBox`}
                    >
                        {userVideoAudio["localUser"].video ? null : (
                            <div className="UserName">{currentUser}</div>
                        )}
                        <video
                            className="MyVideo"
                            onClick={expandScreen}
                            ref={userVideoRef}
                            muted
                            autoPlay
                            playsInline
                        ></video>
                    </div>
                    {peers &&
                        peers.map((peer, index, arr) =>
                            createParticipantVideo(peer, index, arr)
                        )}
                    <ControlBar
                        clickScreenSharing={clickScreenSharing}
                        clickChat={clickChat}
                        clickWord={clickWord}
                        clickBoard={clickBoard}
                        goToBack={goToBack}
                        toggleCameraAudio={toggleCameraAudio}
                        userVideoAudio={userVideoAudio["localUser"]}
                        screenShare={screenShare}
                        roomId={roomId}
                    />
                </div>
            </div>
            <Chat display={displayChat} roomId={roomId} onClick={clickChat} />
            <WordScreen display={displayWord} roomId={roomId} onClick={clickWord} />
            <Board display={displayBoard} roomId={roomId} clickBoard={clickBoard} onClick={clickBoard} />
        </div>
    );
};

export default VideoCallScreen;
