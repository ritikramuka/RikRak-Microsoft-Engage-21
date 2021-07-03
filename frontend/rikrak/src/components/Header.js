import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { ImUser as PersonCircle } from "react-icons/im";
import "./style/Header.css";
import { database } from "../Firebase/firebase";
import profile_pic from "../Images/profile_pic.svg";
import { animateScroll as scroll } from "react-scroll";
import "./style/NavBar.css";

function Header() {
    const [scrollNav, setScrollNav] = useState(false);
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState("Guest");
    const [lastName, setLastName] = useState("");
    const [profileImg, setProfileImg] = useState(profile_pic);
    const { logout, currUser } = useAuth();
    const history = useHistory();

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNav);
    }, []);

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    useEffect(() => {
        const user = database.users.doc(currUser.uid).get();
        user.then((doc) => {
            // console.log(doc.data().profileUrl);
            if (doc.data().firstName) setFirstName(doc.data().firstName);
            if (doc.data().lastName) setLastName(doc.data().lastName);
            if (
                doc.data().profileUrl !==
                "https://firebasestorage.googleapis.com/v0/b/rikrak-auth-dev.appspot.com/o/users%2Fu0BdamkPricQpXLgFJnB7cZSsUh1%2FProfileImage?alt=media&token=50fda9c4-2f87-4c5c-95bd-19e682d5c367"
            )
                setProfileImg(doc.data().profileUrl);
        });
        // eslint-disable-next-line
    }, []);

    async function handleLogout(e) {
        try {
            setError("");
            await logout();
            history.push("/main");
        } catch {
            setError("Failed to log out");
            console.log(error);
        }
    }

    return (
        <nav className={`Header ${scrollNav ? "HeaderBgDark" : "HeaderBgTrans"}`
        }>
            <div className="HeaderContainer">
                <Link className="HeaderLogo" to="/main" onClick={toggleHome}>
                    RikRak
                </Link>
                <button className="HeaderBtn">
                    <PersonCircle className="profile" style={{ pointerEvents: "none" }}>
                    </PersonCircle>
                    <div className="dropdown-content">
                        <div className="circle">
                            <div className='imgBx'>
                                <img src={profileImg} alt={profile_pic} className="profile_image" />
                            </div>
                        </div>
                        <div className='content'>
                            <h3 className='Name'>{firstName} {lastName}</h3>
                            <h3>{currUser && currUser.email}</h3>
                            <button className='Logout-btn'
                                onClick={() => {
                                    handleLogout();
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </button>
            </div>
        </nav >
    );
}

export default Header;


/*
 <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/">RikRak</Navbar.Brand>
                <Nav className="ml-auto">
                    <Dropdown drop="left">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <PersonCircle></PersonCircle>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Img variant="top" src={profileImg} />
                                    <Card.Body>
                                        <Card.Title>{currUser && currUser.email}</Card.Title>
                                        <Card.Title>{firstName}</Card.Title>
                                        <Card.Title>{lastName}</Card.Title>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                handleLogout();
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </Card.Body>
                                </Card>
                                <div className="Card"></div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
*/