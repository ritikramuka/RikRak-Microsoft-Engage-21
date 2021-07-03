import React, { useEffect, useState, useRef } from "react";
import socket from "../Sockets/socket";
import "./style/Chat.css";

const Chat = ({ display, roomId }) => {
  const currentUser = sessionStorage.getItem("user");
  const [message, setMessage] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    socket.on("getMessage", ({ msg, sender }) => {
      setMessage((msgs) => [...msgs, { sender, msg }]);
    });
  }, []);

  // Scroll to Bottom of Message List smooth
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      const msg = e.target.value;
      if (msg) {
        socket.emit("sendMessage", { roomId, msg, sender: currentUser });
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className={display ? "ChatContainer" : "width0 ChatContainer"}>
      <div className="text-heading">Group Chat</div>
      <div className="text-area">
        <div className="text-list">
          {message &&
            message.map(({ sender, msg }, idx) => {
              if (sender !== currentUser) {
                return (
                  <div className="senders-text" key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </div>
                );
              } else {
                return (
                  <div className="users-text" key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </div>
                );
              }
            })}
          <div style={{ float: "left", clear: "both" }} ref={messagesEndRef} />
        </div>
      </div>
      <input
        className="bottom-input"
        type="text"
        placeholder="Enter Your Message"
        ref={inputRef}
        onKeyUp={sendMessage}
      />
    </div>
  );
};

export default Chat;
