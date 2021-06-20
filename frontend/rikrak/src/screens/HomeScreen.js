import React, { useRef, useState, useEffect } from "react";
import {
    Col,
    Container,
    Form,
    Button,
    Image,
    Row,
    FormControl,
    Alert,
} from "react-bootstrap";
import "./style/HomeScreen.css";
import "./style/Screen.css";
import socket from "../Sockets/socket";
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
        <div className="HomeScreen">
            <Container>
                <Row className="py-5">
                    <Col lg={8}>
                        <Image
                            src="https://cdn.pixabay.com/photo/2020/06/29/13/58/video-conference-5352757_960_720.png"
                            fluid
                        ></Image>
                    </Col>
                    <Col lg={4} className="">
                        <Form>
                            <div className="mt-5">
                                <div className="Form-Heading">RikRak-Friends</div>
                                <div className="Form-SubHeading">
                                    Create video calls with friends and family with one click!👋
                                </div>
                            </div>
                            <div className="mt-5">
                                <FormControl
                                    placeholder="Room Name"
                                    aria-label="Room Name"
                                    aria-describedby="basic-addon2"
                                    ref={roomNameRef}
                                    className="mt-2"
                                />
                                <FormControl
                                    placeholder="User Name"
                                    aria-label="User Name"
                                    aria-describedby="basic-addon2"
                                    ref={userNameRef}
                                    className="mt-2"
                                />
                                <Button variant="primary" onClick={join} className="my-3" block>
                                    Enter
                                </Button>
                                {err ? <Alert variant="danger">{errMsg}</Alert> : null}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
};

export default HomeScreen;
