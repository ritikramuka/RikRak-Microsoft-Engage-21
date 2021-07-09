import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import SideBarChat from "./SideBarChat.js";
import "./style/SideBar.css";
import { database } from "../Firebase/firebase";
import { useAuth } from "../Contexts/AuthContext";
import { IoMdExit } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [profileImg, setProfileImg] = useState("");
    const { currUser } = useAuth();
    const [sidebarBool, setsidebarBool] = useState(true);
    const [search, setSearch] = useState([]);
    const [input, setInput] = useState("");

    const matcher = (s, values) => {
        const re = RegExp(`.*${s.toLowerCase().split("").join(".*")}.*`);
        return values.filter((v) => v.data.name.toLowerCase().match(re));
    };
    const handleChange = (e) => {
        setsidebarBool(false);
        setInput(e.target.value);
    };

    useEffect(() => {
        if (rooms.length > 0) {
            setSearch(matcher(input, rooms));
        }
        if (input === "") {
            setsidebarBool(true);
        }
        // eslint-disable-next-line
    }, [input]);

    useEffect(() => {
        const user = database.users.doc(currUser.uid).get();
        user.then((doc) => {
            if (
                doc.data().profileUrl !==
                "https://firebasestorage.googleapis.com/v0/b/rikrak-auth-dev.appspot.com/o/users%2Fu0BdamkPricQpXLgFJnB7cZSsUh1%2FProfileImage?alt=media&token=50fda9c4-2f87-4c5c-95bd-19e682d5c367"
            )
                setProfileImg(doc.data().profileUrl);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const unsubscribe = database.rooms.onSnapshot((snapshot) =>
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="ChatSidebar">
            <div className="ChatSidebar-Header">
                <Avatar src={profileImg} />
                <div className="ChatLogo">RikRak Chats</div>
                <button
                    className="chat-icn-btn"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    <IoMdExit className="exit-icn" />
                </button>
            </div>
            <div className="ChatSidebar-Search">
                <div className="ChatSidebar-SearchConatiner">
                    <AiOutlineSearch className="search-icn" />
                    <input
                        placeholder="Search a chat"
                        value={input}
                        type="text"
                        onChange={handleChange}
                    />
                </div>
            </div>
            {sidebarBool ? (
                <div className="ChatSidebar-Chats">
                    <SideBarChat addNewChat="true" />
                    {rooms.length === 0 ? (
                        <>loading...</>
                    ) : (
                        rooms.map((room) => (
                            <SideBarChat key={room.id} id={room.id} name={room.data.name} />
                        ))
                    )}
                </div>
            ) : (
                <div className="sidebar__chats ">
                    <SideBarChat addNewChat="true" />
                    {search.map((room) => (
                        <SideBarChat key={room.id} id={room.id} name={room.data.name} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Sidebar;
