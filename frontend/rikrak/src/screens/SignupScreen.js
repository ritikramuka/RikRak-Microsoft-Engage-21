import React, { useRef, useState } from "react";
import { Alert, Button, Container, Form, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { storage, database } from "../Firebase/firebase";

function SignupScreen() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [userImage, setUserImage] = useState("");
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleUpload = (e) => {
        let file = e?.target?.files[0];
        if (file != null)
            setUserImage(file);
        // console.log(file)
    }

    async function submit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);

            const userCredential = await signup(emailRef.current.value, passwordRef.current.value);
            const email = emailRef.current.value;
            const firstName = firstNameRef.current.value;
            const uid = userCredential.user.uid;
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(userImage);
            uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);
                },
                (error) => {
                    // Handle unsuccessful uploads
                    setError("Failed to upload File")
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((imgDownloadURL) => {
                        database.users.doc(uid).set({
                            email: email,
                            userId: uid,
                            firstName: firstName,
                            profileUrl: imgDownloadURL
                        })
                    });
                }
            );
            history.push("/");
        } catch {
            setError("Failed to create an account");
        }
        setLoading(false);
    }

    return (
        <>
            <Header />
            <div className="SignupScreen">
                <Container>
                    <Row className="justify-content-md-center mt-3">
                        <Form onSubmit={submit}>
                            <div className="Form-Heading">Create a new account</div>
                            <div className="Form-SubHeading">It's quick and easy.</div>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            placeholder="First name"
                                            ref={firstNameRef}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            placeholder="Last name"
                                            ref={lastNameRef}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    ref={emailRef}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    ref={passwordRef}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    ref={passwordConfirmRef}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Text className="text-muted">
                                    We'll never share your details with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.File id="exampleFormControlFile1" label="Example file input" onChange={(e) => handleUpload(e)} />
                            </Form.Group>
                            <Button type="Submit" disabled={loading} block>
                                Sign Up
                            </Button>
                        </Form>
                    </Row>
                    <Row className="justify-content-md-center mt-3">
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default SignupScreen;
