import React, { useEffect, useState } from "react";
import "./leftsidebar.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

const LeftSideBar = () => {
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // useEffect(() => {
  //   const body = document.body;
  //   if (isDarkMode) {
  //     body.classList.add("dark-mode");
  //   } else {
  //     body.classList.remove("dark-mode");
  //   }
  // }, [isDarkMode]);

  let User = useSelector((state) => state.currentUserReducer);
  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <NavLink to="/" className="side-nav-links" activeclassname="active">
          <p>Home</p>
        </NavLink>

        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <NavLink
            to="/Questions"
            className="side-nav-links"
            activeclassname="active"
          >
            <FontAwesomeIcon icon={faEarthAsia} className="globe-icon" />

            <p style={{ paddingLeft: "10px" }}>Questions</p>
          </NavLink>
          <NavLink
            to="/Tags"
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
          >
            <p>Tags</p>
          </NavLink>

          <NavLink
            to="/Users"
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
          >
            <p>Users</p>
          </NavLink>

          <NavLink
            to={User ? "/Social" : "/Auth"}
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
          >
            <p>Social</p>
          </NavLink>
          {/* <div>
            {isDarkMode ? (
              <FontAwesomeIcon
                icon={faMoon}
                onClick={() => setIsDarkMode(!isDarkMode)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSun}
                onClick={() => setIsDarkMode(!isDarkMode)}
              />
            )}
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default LeftSideBar;
