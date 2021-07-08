import React from 'react';
import Sidebar from "../ChatScreenComponents/SideBar";
import Welcome from "../ChatScreenComponents/Welcome";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "../ChatScreenComponents/Chat";
import "./style/ChatScreen.css"

function ChatScreen() {
    return (
        <>
            <div className="chatxyz">
                <div className="chat__body">
                    <Router>
                        <Sidebar />
                        <Switch>
                            <Route path="/connect/:roomId">
                                <Chat />
                            </Route>
                            <Route path="/connect">
                                <Welcome />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </>
    )
}

export default ChatScreen
