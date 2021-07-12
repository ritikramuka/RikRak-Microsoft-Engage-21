import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Buttons.css";
import { MdArrowForward, MdKeyboardArrowRight } from "react-icons/md";
import Video from "../videos/video.mp4";
import "./style/Hero.css";

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => setHover(!hover);

  return (
    <div className="HeroContainer" id="home">
      <div className="HeroBg">
        <video
          className="VideoBg"
          autoPlay
          loop
          muted
          src={Video}
          type="video/mp4"
        />
      </div>
      <div className="HeroContent">
        <h1 className="HeroH1">Free browser based video calling</h1>
        <p className="HeroP">
          Simple, Secure, and Fast. Simple peer video calling provides high quality
          and low latency simply not available with traditional technology.
        </p>
        <div className="HeroBtnWrapper">
          <Link
            to="/login"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            className={`Button primary dark small fontSmall`}
          >
            Get started{" "}
            {hover ? (
              <MdArrowForward className="ArrowForward" />
            ) : (
              <MdKeyboardArrowRight className="ArrowRight" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
