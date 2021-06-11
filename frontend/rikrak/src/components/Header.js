import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Navbar bg='primary' variant='dark'>
                <Navbar.Brand href='/'>RikRak</Navbar.Brand>
                <Nav className='ml-auto'>
                    <Link to='/login'>
                        <Button variant='dark'>Login</Button>
                    </Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header
