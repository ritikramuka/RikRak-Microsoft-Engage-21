import React from 'react';
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import './style/LoginScreen.css';

function LoginScreen() {
    return (
        <div className='LoginScreen m-5'>
            <Container className='LoginScreen__Container py-5'>
                <Row>
                    <Col lg={8} className='LoginScreen__Image'>
                        <Image src='https://cdn.pixabay.com/photo/2020/06/17/16/28/webinar-5310229_960_720.jpg' alt='product' rounded fluid />
                    </Col>
                    <Col lg={4} className='LoginScreen__Form'>
                        <Form>
                            <div className='LoginScreen__Form-Heading'>Welcome!</div>
                            <div className='LoginScreen__Form-SubHeading'>Login to your Account</div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" className='LoginScreen__Form-input' />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
    </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" className='LoginScreen__Form-input' />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
  </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginScreen