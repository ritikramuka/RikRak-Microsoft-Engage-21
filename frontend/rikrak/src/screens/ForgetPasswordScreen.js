import React, { useRef, useState } from "react";
import { Col, Container, Row, Form, Button, Image, Alert } from "react-bootstrap";
import "./style/Screen.css";
import Header from "../components/Header";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";

function ForgetPasswordScreen() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function submit(e) {
        e.preventDefault();

        try {
            setError("");
            setMessage("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("check your email for further instructions");
        } catch {
            setError("Failed to reset password");
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
                                <div className="Form-SubHeading">Reset Password For your Account</div>
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
                                <Button type="submit" disabled={loading} block>
                                    Reset Password
                                </Button>
                            </Form>
                            <Row className="justify-content-md-center mt-3">
                                <Link to="/login">Login</Link>
                            </Row>
                            <Row className="justify-content-md-center mt-3">
                                {error && <Alert variant="danger">{error}</Alert>}
                            </Row>
                            <Row className="justify-content-md-center mt-3">
                                {message && <Alert variant="info">{message}</Alert>}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ForgetPasswordScreen;
