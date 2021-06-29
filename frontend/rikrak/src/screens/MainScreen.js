import React, { useState } from "react";
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

const MainScreen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

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
