import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection/InfoSection";
import {
    homeObjeOne,
    homeObjeTwo,
    homeObjeThree,
} from "../components/InfoSection/Data";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";

const MainScreen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory();
    const { currUser } = useAuth();

    useEffect(() => {
        if (currUser) history.push("/");
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <HeroSection />
            <InfoSection {...homeObjeOne} />
            <InfoSection {...homeObjeTwo} />
            <Services />
            <InfoSection {...homeObjeThree} />
            <Footer />
        </>
    );
};

export default MainScreen;
