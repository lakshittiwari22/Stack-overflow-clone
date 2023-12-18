import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faMagnifyingGlass,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import icon from "../../assets/stack-overflow.png";
import Avatar from "../Avatar/Avatar";
import { setCurrentUser } from "../../actions/currentUser";
import Menubar from "./Menubar";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [slide, setSlide] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef(); //gives the referece of the elemet clicked by the user
  // seletes a particular reducer and fetches data

  const body = document.body;
  if (isDarkMode) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }

  let User = useSelector((state) => state.currentUserReducer);
  let allUsers = useSelector((state) => state.usersReducer);
  const currentUser = allUsers?.filter(
    (user) => user._id === User?.result?._id
  )[0];

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
    //dark mode toggle

    const now = new Date();

    const getWeatherInfo = async () => {
      const apiKey = "Your_API_KEY";
      const city = "haldwani";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        const sunrise = new Date(weatherData.sys.sunrise * 1000).getHours();
        const sunset = new Date(weatherData.sys.sunset * 1000).getHours();
        const hour = now.getHours();
        const body = document.body;
        console.log(weatherData);

        const isDarkWeather = weatherData.weather.some((condition) =>
          ["Clouds", "Rain", "Snow", "Thunderstorm"].includes(condition.main)
        );

        console.log(isDarkWeather);

        if (sunset <= hour || hour < sunrise || isDarkWeather) {
          setIsDarkMode(true);
          body.classList.add("dark-mode");
        } else {
          setIsDarkMode(false);
          body.classList.remove("dark-mode");
        }
      } catch (error) {
        console.error("Error fetching weather information", error);
      }
    };
    getWeatherInfo();

    // Set up an interval to toggle dark mode automatically every minute
    const intervalId = setInterval(() => {
      getWeatherInfo();
    }, 30 * 60000); // Check every 30 minutes

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
      clearInterval(intervalId);
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
            <div className="logo-contianer">
              <img src={icon} alt="stack-overflow-icon" className="logo" />{" "}
              <p>
                stack<span>Overflow</span>
              </p>
            </div>
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

            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          </form>

          {User === null ? (
            <div className="loginBtn-container-mobile">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon-mobile"
              />
              <button
                className="nav-item nav-links"
                onClick={() => navigate("/Auth")}
              >
                Log In
              </button>

              <div
                className="dark-mode-toggle-container"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? (
                  <FontAwesomeIcon
                    icon={faSun}
                    className="dark-mode-icon"
                    style={{ color: "#ef8236" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faMoon}
                    className="dark-mode-icon"
                    style={{ color: "#414141" }}
                  />
                )}
              </div>
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
                {currentUser?.profileImg !== "" ? (
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
              <div
                className="dark-mode-toggle-container"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? (
                  <FontAwesomeIcon
                    icon={faSun}
                    className="dark-mode-icon"
                    style={{ color: "#ef8236" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faMoon}
                    className="dark-mode-icon"
                    style={{ color: "#414141" }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
