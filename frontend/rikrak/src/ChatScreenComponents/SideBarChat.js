import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./style/SideBarChat.css";
import { database } from "../Firebase/firebase";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (id) {
            database.rooms
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.random() * (70 - 1) + 1);
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        const pass = prompt("please enter pin to secure");

        if (roomName) {
            database.rooms.add({
                name: roomName,
                pin: pass
            });
        }
    };

    return !addNewChat ? (
        <div>
            <Link to={`/connect/${id}`}>
                <div className="SidebarChat">
                    <Avatar src={`https://i.pravatar.cc/150?img=${seed}`} />
                    <div className="SidebarChatInfo">
                        <h2>{name}</h2>
                        <p>{messages[0]?.message}</p>
                    </div>
                </div>
            </Link>
        </div >
    ) : (
        <button onClick={createChat} className="AddNewChat">
            <div className="AddNewChat-Header">Add new Chat <MdAddCircle className="add-icn"/></div>
        </button>
    );
}

export default SidebarChat;
