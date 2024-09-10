import React from "react";
import "../assets/css/login.css";
import img from "../assets/images/image(2).png";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={img} alt="Login" />
        <div className="login-image-text">
          <h4>
            Navigate the Markets
            <br />
            with Confidence
          </h4>
          <div className="flex">
            <p>Advanced Technical Analysis/Charting Tools</p>
            <p>AI Tools</p>
          </div>
          <div className="flex">
            <p>Advanced AI Trading Bots</p>
            <p>Advanced AI Analyses</p>
          </div>
        </div>
      </div>
      <div className="login-form">
        <h2>Login</h2>
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />
        {/* <label htmlFor="password">Password</label> */}
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
        <p className="terms-and-services">By logging in, you agree to follow our terms of service</p>
      </div>
    </div>
  );
};

export default Login;
