import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@material-ui/core";
import "./style/Chat.css";
import { useParams } from "react-router-dom";
import { database } from "../Firebase/firebase";
import firebase from "firebase";
import { useAuth } from "../Contexts/AuthContext";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlineEmojiHappy } from "react-icons/hi";

function Chat() {
    const { currUser } = useAuth();
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [firstName, setFirstName] = useState("Guest");
    const [lastName, setLastName] = useState("");
    const [pin, setPin] = useState("");
    const [emoji, setEmoji] = useState(false);

    useEffect(() => {
        const user = database.users.doc(currUser.uid).get();
        user.then((doc) => {
            if (doc.data().firstName) setFirstName(doc.data().firstName);
            if (doc.data().lastName) setLastName(doc.data().lastName);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (roomId) {
            database.rooms
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            database.rooms
                .doc(roomId)
                .onSnapshot((snapshot) => setPin(snapshot.data().pin));

            database.rooms
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.random() * (70 - 1) + 1);
    }, [roomId]);

    const sendMessage = (event) => {
        event.preventDefault();
        database.rooms
            .doc(roomId)
            .collection("messages")
            .add({
                name: firstName + " " + lastName,
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                email: currUser.email
            })
        setInput("");
    };

    const deleteRoom = () => {
        const passwordVerify = prompt("Enter Admin Password to delete Room");
        if (passwordVerify === pin) {
            database.rooms
                .doc(roomId)
                .delete()
                .then(function () {
                    window.location = "/connect";
                })
                .catch(function (error) {
                    console.error("Error removing document: ", error);
                });
        } else {
            alert("You are not authorised to delete rooms");
        }
    };

    const addEmoji = (e) => {
        let emoji = e.native;
        setInput(input + emoji);
    };

    const checkEmojiClose = () => {
        if (emoji) {
            setEmoji(false);
        }
    };

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(() => {
        scrollToBottom();
    });
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="SideBar-Chat">
            <div className="SideBar-Chat-Header">
                <Avatar src={`https://i.pravatar.cc/150?img=${seed}`} />
                <div className="SideBar-Chat-Header-Info">
                    <div className="GroupName">{roomName}</div>
                    <div className="LastSeen">
                        last seen{" "}
                        {String(messages[messages.length - 1]?.timestamp?.toDate()).slice(0, 21)}
                    </div>
                </div>

                <div className="SideBar-Chat-Header-Right">
                    <button className="chat-icn-btn" onClick={deleteRoom}>
                        <AiFillDelete className="delete-icn" style={{ pointerEvents: "none" }} />
                    </button>
                </div>
            </div>

            <div className="SideBar-Chat-Body">
                {messages.map((message) => (
                    <p className={`SideBar-Chat-Message ${message.email === (currUser.email)
                        && "SideBar-Chat-Message-Reciever"}`}>
                        <span className="SideBar-Chat-Message-Name">{message.name + " " + String(message.timestamp?.toDate()).slice(15, 21)}</span>
                        <p className={`Message-Sender ${message.email === (currUser.email) && "Message-Reciever"}`}>{message.message}</p>
                    </p>
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="SideBar-Chat-Footer">
                <button className="chat-icn-btn" onClick={() => setEmoji(!emoji)}>
                    <HiOutlineEmojiHappy
                        className="emoji-icn"
                        style={{ pointerEvents: "none" }}
                        onClick={() => setEmoji(!emoji)}
                    />
                    {emoji ? <Picker onSelect={addEmoji} /> : null}
                </button>
                <form>
                    <input
                        value={input}
                        onClick={checkEmojiClose}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                </form>
            </div>
        </div >
    );
}

export default Chat;