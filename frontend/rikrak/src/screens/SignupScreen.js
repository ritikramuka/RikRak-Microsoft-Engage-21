import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function SignupScreen() {
    return (
        <div className='SignupScreen'>
            <Container>
                <Row className="justify-content-md-center mt-3">
                    <Form>
                        <div className='Form-Heading'>Create a new account</div>
                        <div className='Form-SubHeading'>It's quick and easy.</div>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control placeholder="First name" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control placeholder="Last name" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId='formGroupEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' />
                        </Form.Group>
                        <Form.Group controlId='formGroupPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' />
                        </Form.Group>
                        <Form.Group>
                            <div key='inline-radio' className='md-2'>
                                <Form.Check inline label='Male' name='Gender' type='radio' id='inline-radio-male' />
                                <Form.Check inline label='Female' name='Gender' type='radio' id='inline-radio-female' />
                                <Form.Check inline label='Others' name='Gender' type='radio' id='inline-radio-others' />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Text className='text-muted'>
                                We'll never share your details with anyone else.
    </Form.Text>
                        </Form.Group>
                        <Button type='Submit' size='lg'>Sign Up</Button>
                    </Form>
                </Row>
            </Container>
        </div>
    )
}

export default SignupScreen
