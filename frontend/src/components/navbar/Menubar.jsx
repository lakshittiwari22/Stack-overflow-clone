import React from "react";
import "./menubarbar.css";
import { NavLink } from "react-router-dom";
import globe from "../../assets/globe.svg";

const Menubar = ({ slide }) => {
  const handleSlide = () => {};
  return (
    <div className="menubar">
      <nav className="menu-nav">
        <NavLink
          to="/"
          className="menu-nav-links"
          activeclassname="active"
          onClick={handleSlide}
        >
          <p>Home</p>
        </NavLink>

        <div className="menu-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <NavLink
            to="/Questions"
            className="menu-nav-links"
            activeclassname="active"
            onClick={handleSlide}
          >
            <img src={globe} alt="globe" className="globe-icon" />
            <p style={{ paddingLeft: "10px" }}>Questions</p>
          </NavLink>
          <NavLink
            to="/Tags"
            className="menu-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
            onClick={handleSlide}
          >
            <p>Tags</p>
          </NavLink>

          <NavLink
            to="/Users"
            className="menu-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
            onClick={handleSlide}
          >
            <p>Users</p>
          </NavLink>
          <NavLink
            to="/Social"
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
          >
            <p>Social</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Menubar;
