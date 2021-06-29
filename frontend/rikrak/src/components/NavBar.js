import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./style/NavBar.css";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

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

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className={`Nav ${scrollNav ? "NavBgDark" : "NavBgTrans"}`}>
          <div className="NavbarContainer">
            <Link className="NavLogo" to="/" onClick={toggleHome}>
              RikRak
            </Link>
            <div className="MobileIcon" onClick={toggle}>
              <FaBars />
            </div>
            <ul className="NavMenu">
              {[
                { to: "about", title: "About" },
                { to: "discover", title: "Discover" },
                { to: "services", title: "Services" },
                { to: "signup", title: "Sign Up" },
              ].map(({ to, title }) => (
                <li className="NavItem" key={to}>
                  <ScrollLink
                    className="NavLinks"
                    to={to}
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    {title}
                  </ScrollLink>
                </li>
              ))}
            </ul>
            <nav className="NavBtn">
              <Link className="NavBtnLink" to="/signin">
                Log In
              </Link>
            </nav>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
