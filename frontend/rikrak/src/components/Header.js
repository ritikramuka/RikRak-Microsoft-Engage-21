import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {

    // getting current location and setting nav elements w.r.t. to it
    const [nav, setNav] = useState('Home');
    useEffect(() => {
        const url = window.location.href;
        const currentLocation = url.substr(url.lastIndexOf('/'));

        if (currentLocation === '/') setNav('Home');
        else if (currentLocation === '/login') setNav('Login');
    }, [nav]);

    return (
        <div>
            <Navbar bg='primary' variant='dark'>
                <Navbar.Brand href='/'>RikRak</Navbar.Brand>
                <Nav className='ml-auto'>
                    {nav !== 'Home' ? (
                        <Link to='/'>
                            <Button variant='dark' className='mr-2' onClick={() => setNav('Home')}>Home</Button>
                        </Link>
                    ) : null}
                    {nav !== 'Login' ? (
                        <Link to='/login'>
                            <Button variant='dark' className='mr-2' onClick={() => setNav('Login')}>LogIn</Button>
                        </Link>
                    ) : null}
                    {nav !== 'Signin' ? (
                        <Link to='/signin'>
                            <Button variant='dark' className='mr-2' onClick={() => setNav('Signin')}>SignIn</Button>
                        </Link>
                    ) : null}
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header
