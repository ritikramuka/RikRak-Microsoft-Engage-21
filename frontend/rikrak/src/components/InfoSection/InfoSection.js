import React from "react";
import "../style/Buttons.css";
import "../style/Info.css";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

const InfoSection = ({
  id,
  lightBg,
  lightText,
  topLine,
  headline,
  description,
  buttonLabel,
  imgStart,
  img,
  alt,
  primary,
  darkText,
}) => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <div
        className={`InfoContainer ${lightBg ? "lightBg" : "darkBg"}`}
        id={id}
      >
        <div className="InfoWrapper">
          <div className={`InfoRow ${imgStart ? "c2c1" : "c1c2"}`}>
            <div className="Column1">
              <div className="TextWrapper">
                <div className="TopLine">{topLine}</div>
                <h1
                  className={`Heading ${lightText ? "lightText" : "darkText"}`}
                >
                  {headline}
                </h1>
                <p
                  className={`Subtitle ${darkText ? "darkText" : "lightText"}`}
                >
                  {description}
                </p>
                <div className="BtnWrap">
                  <Link
                    className={`Button ${
                      primary ? "primary dark" : "secondary light"
                    } small fontSmall`}
                    to={() => {
                      if (buttonLabel === "Get started") return "/login";
                      else if (buttonLabel === "Learn more") return "/main";
                      else return "/signup";
                    }}
                    onClick={() => {
                      if (buttonLabel === "Learn more") return toggleHome();
                    }}
                    smooth="true"
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    {buttonLabel}
                  </Link>
                </div>
              </div>
            </div>
            <div className="Column2">
              <div className="ImgWrap">
                <img className="Img" src={img} alt={alt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
