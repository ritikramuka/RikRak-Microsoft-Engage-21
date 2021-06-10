import React from 'react';
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import './style/LoginScreen.css';

function LoginScreen() {
    return (
        <Container ClassName='LoginScreen'>
            <Row>
                <Col md={8} ClassName='LoginScreen__Image'>
                    <Image src='https://cdn.pixabay.com/photo/2020/06/17/16/28/webinar-5310229_960_720.jpg' alt='product' fluid />
                </Col>
                <Col md={4} ClassName='LoginScreen__Form'>
                    <Form>
                        <div ClassName='LoginScreen__Form-Heading'>Welcome!</div>
                        <div ClassName='LoginScreen__Form-SubHeading'>Sign in to your Account</div>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ClassName='LoginScreen__Form-input' />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
    </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
  </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginScreen
