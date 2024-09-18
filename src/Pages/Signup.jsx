import React, { useState } from "react";
import axios from "axios";
import "../assets/css/login.css";
import img from "../assets/images/image(2).png";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState(""); // Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the sign-up API (registration endpoint)
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
      });

      // Extract the token from the response
      const { token } = response.data;
      localStorage.setItem("authToken", token);

      // Redirect to the Markets page
      navigate("/Markets");

    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={img} alt="Signup" />
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
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form">
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>

        {/* Add "Already have an account" section */}
        <p className="terms-and-services">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Go to Login
          </Link>
        </p>
        <p className="terms-and-services">
          By signing up, you agree to follow our <span className="link"> terms of service</span>

        </p>
      </div>
    </div>
  );
};

export default Signup;
