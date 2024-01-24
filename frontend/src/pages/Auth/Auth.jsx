import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import icon from "../../assets/stack-overflow.png";
import googleLogo from "../../assets/google-logo.png";
import AboutAuth from "./AboutAuth";
import {
  signup,
  login,
  signUpWithGoogle,
  loginWithOTP,
} from "../../actions/auth";

import "./auth.css";


const Auth = () => {
  const [isSignup, setisSignup] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationResult, setVerificationResult] = useState("");
  const [email, setEmail] = useState("");
  const [otpInput, setOtpInput] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setisSignup(!isSignup);
  };

  const handleGoogleLoginSuccess = (tokenResponse) => {
    const accessToken = tokenResponse.access_token;

    dispatch(signUpWithGoogle(accessToken, navigate));
  };
  const newPhoneNumber = "+91" + phoneNumber;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("enter email and password");
    }

    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      if (!isValidPhoneNumber) {
        alert("invalid phone number");
      }
      
      dispatch(
        signup({ name, phoneNumber: newPhoneNumber, email, password }, navigate)
      );
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Remove any non-numeric characters
    const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Check if the length is 10 and all characters are numeric
    return numericPhoneNumber.length === 10 && /^\d+$/.test(numericPhoneNumber);
  };

  const handleOTP = (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Invalid phone number");
      return;
    }

    if (otp === verificationResult) {
      dispatch(loginWithOTP({ phoneNumber: newPhoneNumber }, navigate));
    } else {
      alert("invaild otp");
    }
  };

  const sendOTP = async () => {
    setOtpInput(!otpInput);
    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Invalid phone number");
      setOtpInput(false)
      return;
    }
    try {
      // Replace 'YOUR_SERVER_ENDPOINT' with your actual server endpoint
      const response = await axios.post("https://stack-overflow-clone-server-3-21se.onrender.com/user/send-otp", {
        phoneNumber: newPhoneNumber,
      });

      // Handle the response from the server, e.g., update UI or state
      setVerificationResult(response.data.message);
      console.log(`OTP:${response.data.message}`);
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error("Error verifying OTP:", error.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
  });

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}

      <div className="auth-container-2">
        {!isSignup && (
          <img src={icon} alt="stack overflow icon" className="login-logo" />
        )}
        {/*---------- Sign in with google-------------------- -*/}

        <button className="google-btn" onClick={() => loginWithGoogle()}>
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
          {isSignup ? "Sign up with google" : "Log in with google"}
        </button>
        {!isSignup && (
          <form onSubmit={handleOTP}>
            <h5 style={{ margin: "0", textAlign: "center", color: "gray" }}>
              Login With Phone
            </h5>
            <label htmlFor="number">
              <h4>Phone Number</h4>
              <input
                type="tel"
                name="number"
                id="number"
                pattern="[0-9]{10}"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </label>
            <label htmlFor="code">
              <h4>OTP</h4>
              <input
                type="text"
                id="otp"
                name="otp"
                maxLength="6"
                pattern="\d{6}"
                autoComplete="one-time-code"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </label>
            <button type="button" className="otp-btn" onClick={sendOTP}>
              send otp
            </button>
            <button type="submit" className="auth-btn">
              Log in
            </button>
          </form>
        )}
        {!isSignup && <p style={{ color: "gray" }}>or</p>}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            //------username------
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          {/* ----------phone---------- */}
          {isSignup && (
            <div>
              <label htmlFor="number">
                <h4>
                  Phone number {"("}optional{")"}
                </h4>
                <input
                  type="tel"
                  name="number"
                  id="number"
                  pattern="[0-9]{10}"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </label>
              
            </div>
          )}

          {/*------ emial -----*/}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
           
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          {/* ------password------ */}
          <label
            htmlFor="password"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0",
              }}
            >
              <h4 style={{ margin: "10px 0" }}>Password</h4>
              {!isSignup && <p style={{ color: "#007ac6" }}>forgot password</p>}
            </div>
            <input
              style={{ width: "90%", margin: "0" }}
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {isSignup && (
              <p style={{ color: "#666767", fontSize: "13px" }}>
                passwords must contain atleast eight <br /> charcters, including
                atleast 1 <br /> letter and 1 number
              </p>
            )}
          </label>
          {isSignup && (
            <label htmlFor="check" style={{ display: "flex", gap: "5px" }}>
              <input type="checkbox" id="check" style={{ width: "30px" }} />
              <p style={{ fontSize: "13px" }}>
                Opt-in to receive occasional,
                <br /> products, user research invitations,
                <br /> company announcements, and digests.
              </p>
            </label>
          )}
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>

          {isSignup && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              By clicking "Sign up", you agree to our
              <span style={{ color: "#007ac6" }}>
                {" "}
                terms of <br />
                service
              </span>
              , <span style={{ color: "#007ac6" }}>privacy policy </span> and
              <span style={{ color: "#007ac6" }}> cookie policy</span>
            </p>
          )}
        </form>
        <p>
          {isSignup ? "already have an account?" : "Don't have an account?"}

          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
