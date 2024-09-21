import React, { useState } from "react";
import axios from "axios";
import "../assets/css/login.css";
import img from "../assets/images/image(2).png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      localStorage.setItem("authToken", response.data.authorisation.token);
      sessionStorage.setItem("authToken", response.data.authorisation.token);
      console.log(response.data.authorisation.token);
      
      navigate("/Markets");

    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage("Login failed. Please try again.");
      }else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={img} alt="Login" />
        <div className="login-image-text flex column">
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
            <p>Advanced AI Analysis</p>
          </div>
        </div>
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <div className="form">
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" onClick={handleSubmit}>Login</button>

          {errorMessage && <p className="error-message" style={{ color: "red", padding: "10px 0 5px 0" }}>{errorMessage}</p>}
        </div>
        <p className="terms-and-services">
          Do not have an account?{" "}
          <Link to="/signup" className="link">
            Go to Sign Up
          </Link>
        </p>
        <p className="terms-and-services">
          By logging in, you agree to follow our <span className="link">terms of service</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
