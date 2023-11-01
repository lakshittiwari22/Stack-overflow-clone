import React from "react";
import './bootstrap-social.css'
import "./auth.css";

const AboutAuth = () => {
  return (
    <div className="auth-container-1">
      <h1>Join the Stack Overflow community</h1>
      <p>Get unstuck — ask a question</p>
      <p>Unlock new privileges like voting and commenting</p>
      <p>Save your favorite tags, filters, and jobs</p>
      <p>Earn reputation and badges</p>
      <p style={{ fontSize: "13px", color: "#666767" }}>
        Collaborate and share knowledge with a private group for
      </p>
      <p style={{ fontSize: "13px", color: "#007ac6" }}>
        Get Stack Overflow for Teams free for up to 50 users.
      </p>
      {/* <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <a class="btn btn-social-icon btn-google" href="/auth/google" role="button">
              <i class="fa fa-google"></i>
              Sign Up with Google
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AboutAuth;
