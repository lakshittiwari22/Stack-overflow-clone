import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import icon from "../../assets/stack-overflow.png";

import logo from "../../assets/logo-stackoverflow.png";
import search from "../../assets/magnifying-glass-solid.svg";
import Avatar from "../Avatar/Avatar";
import { setCurrentUser } from "../../actions/currentUser";
import Menubar from "./Menubar";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [slide, setSlide] = useState(false);
  const menuRef = useRef(); //gives the referece of the elemet clicked by the user
  // seletes a particular reducer and fetches data

  let User = useSelector((state) => state.currentUserReducer);
  let allUsers = useSelector((state) => state.usersReducer)
  const currentUser = allUsers?.filter((user) => user._id === User?.result?._id)[0]

  
  const handleLogout = () => {
    googleLogout();
    dispatch({ type: "LOGOUT" });

    navigate("/");
    dispatch(setCurrentUser(null));
  };

  const handleSlide = () => {
    setSlide(!slide);
  };

  useEffect(() => {
    const token = User?.token;

    //logout user as soon as token expires
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        alert("Token expired! You have been logged out");
        handleLogout();
      }
    }

    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));

    // this handler fuctions closes the sliding menubar whenever clicked outside.
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setSlide(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [dispatch]);

  return (
    <>
      <div className={slide ? "sidebar slide" : "sidebar"} ref={menuRef}>
        <Menubar slide={slide} />
      </div>
      <nav className="main-nav">
        <div className="navbar">
          <div className="nav-bar-mobile">
            <div onClick={handleSlide} className="menubar" ref={menuRef}>
              {!slide ? (
                <FontAwesomeIcon icon={faBars} className="menubar-icon" />
              ) : (
                <FontAwesomeIcon icon={faTimes} className="closing-icon" />
              )}
            </div>

            <img
              src={icon}
              alt="stack-overflow-icon"
              className="stackoverflow-icon"
            />

            <Link to="/" className="nav-item nav-btn-mobile">
              Products
            </Link>
          </div>

          <Link to="/" className="nav-item nav-logo mobile">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn mobile">
            About
          </Link>
          <Link to="/" className="nav-item nav-btn mobile">
            Products
          </Link>
          <Link to="/" className="nav-item nav-btn mobile">
            For Teams
          </Link>

          <form className="mobile search-bar">
            <input type="text" placeholder="Search..." />
            <img
              src={search}
              alt="search icon"
              style={{ width: "18px" }}
              className="search-icon"
            />
          </form>
          {User === null ? (
            <div className="loginBtn-container-mobile">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon-mobile"
              />

              <Link to="/Auth" className="nav-item nav-links">
                Log in
              </Link>
            </div>
          ) : (
            <div className="avatar-container-mobile">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon-mobile"
              />
              <Avatar
                backgroundColor="#009dff"
                px="30px"
                py="30px"
                borderRadius="50%"
                color="white"
              >
                {currentUser?.profileImg !== '' ? (
                  <img
                    src={currentUser?.profileImg}
                    alt="profile-pictures"
                    onClick={() => navigate(`/Users/${currentUser?._id}`)}
                  />
                ) : (
                  <p onClick={() => navigate(`/Users/${currentUser?._id}`)}>
                    {User?.result.name.charAt(0)}
                  </p>
                )}
              </Avatar>

              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
