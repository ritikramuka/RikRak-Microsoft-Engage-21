import React, { useRef, useState } from "react";
import { Col, Container, Row, Form, Button, Image, Alert } from "react-bootstrap";
import "./style/Screen.css";
import Header from "../components/Header";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function LoginScreen() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function submit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to log in");
        }
        setLoading(false);
    }

    return (
        <>
            <Header />
            <div className="LoginScreen">
                <Container>
                    <Row className="py-5">
                        <Col lg={8} className="LoginScreen__Image">
                            <Image
                                src="https://cdn.pixabay.com/photo/2020/06/17/16/28/webinar-5310229_960_720.jpg"
                                alt="product"
                                rounded
                                fluid
                            />
                        </Col>
                        <Col lg={4} className="m-auto">
                            <Form onSubmit={submit}>
                                <div className="Form-Heading">Welcome!</div>
                                <div className="Form-SubHeading">Login to your Account</div>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        ref={emailRef}
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        ref={passwordRef}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" disabled={loading} block>
                                    Login
                                </Button>
                            </Form>
                            <Row className="justify-content-md-center mt-3">
                                <Link to="/forgot-password">Forgot Passsword?</Link>
                            </Row>
                            <Row className="justify-content-md-center mt-3">
                                {error && <Alert variant="danger">{error}</Alert>}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default LoginScreen;
