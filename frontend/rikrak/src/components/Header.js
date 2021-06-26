import React, { useEffect, useState } from "react";
import { Button, Dropdown, Nav, Navbar, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { PersonCircle } from "react-bootstrap-icons";
import "./style/Header.css";

function Header() {
    // getting current location and setting nav elements w.r.t. to it
    const [nav, setNav] = useState("Home");
    const [error, setError] = useState("");
    const { logout, currUser } = useAuth();
    const history = useHistory();
    
    useEffect(() => {
        const url = window.location.href;
        const currentLocation = url.substr(url.lastIndexOf("/"));

        if (currentLocation === "/") setNav("Home");
        else if (currentLocation === "/login") setNav("Login");
        else if (currentLocation === "/signup") setNav("Signup");
        else if (currentLocation === "/forgot-password") setNav("ForgetPassword");
    }, [nav]);

    async function handleLogout(e) {
        try {
            setError("");
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/">RikRak</Navbar.Brand>
                <Nav className="ml-auto">
                    {nav === "Home" ? (
                        <Dropdown drop='left'>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <PersonCircle></PersonCircle>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1606228281437-dc226988dc3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" />
                                        <Card.Body>
                                            <Card.Title>{currUser && currUser.email}</Card.Title>
                                            <Button
                                                variant="primary"
                                                onClick={() => { setNav("Login"); handleLogout(); }}
                                            >
                                                Logout
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : null}
                    {nav === "Login" ? (
                        <Link to="/signup">
                            <Button
                                variant="dark"
                                className="mr-2"
                                onClick={() => setNav("Signup")}
                            >
                                SignUp
                            </Button>
                        </Link>
                    ) : null}
                    {nav === "Signup" ? (
                        <Link to="/login">
                            <Button
                                variant="dark"
                                className="mr-2"
                                onClick={() => setNav("Login")}
                            >
                                LogIn
                            </Button>
                        </Link>
                    ) : null}
                    {nav === "ForgetPassword" ? (
                        <Link to="/login">
                            <Button
                                variant="dark"
                                className="mr-2"
                                onClick={() => setNav("Login")}
                            >
                                LogIn
                            </Button>
                        </Link>
                    ) : null}
                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;
