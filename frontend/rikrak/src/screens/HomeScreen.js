import React from 'react';
import { Col, Container, Form, Button, Image, Row, InputGroup, FormControl } from 'react-bootstrap';
import './style/HomeScreen.css';
import './style/Screen.css';

function HomeScreen() {
    return (
        <div className='HomeScreen'>
            <Container>
                <Row className='py-5'>
                    <Col lg={8}>
                        <Image src='https://cdn.pixabay.com/photo/2020/06/29/13/58/video-conference-5352757_960_720.png' fluid></Image></Col>
                    <Col lg={4} className=''>
                        <Form>
                            <div className='mt-5'>
                                <div className='Form-Heading'>RikRak-Friends</div>
                                <div className='Form-SubHeading'>Create video calls with friends and family with one click!👋</div>
                            </div>
                            <div className='mt-5'>
                                <Button variant='outline-primary' type='submit' className='mb-3' block>
                                    Start New Meeting
  </Button>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Meeting URL"
                                        aria-label="Meeting URL"
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-primary">Enter</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default HomeScreen