import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./style/SideBar.css";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <aside
      className={`SidebarContainer ${isOpen ? "opacity100 top0" : "opacity0 topm100"
        }`}
      onClick={toggle}
    >
      <div className="Icon">
        <FaTimes className="CloseIcon" />
      </div>
      <div className="SidebarWrapper">
        <ul className="SidebarMenu">
          <ScrollLink className="SidebarLink" to="about" onClick={toggle}>
            About
          </ScrollLink>
          <ScrollLink className="SidebarLink" to="discover" onClick={toggle}>
            Discover
          </ScrollLink>
          <ScrollLink className="SidebarLink" to="services" onClick={toggle}>
            Services
          </ScrollLink>
          <ScrollLink className="SidebarLink" to="signup" onClick={toggle}>
            Sign Up
          </ScrollLink>
        </ul>
        <div className="SideBtnWrap">
          <Link className="SidebarRoute" to="/login">
            Log In
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
