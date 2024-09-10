import React from 'react';
import '../assets/css/login.css';
import img from "../assets/images/image(2).png";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={img} alt="Login" />
        <div className="login-image-text flex column">
          <h4>
          Navigate the Markets<br />with Confidence
          </h4>
          <p>Advanced Technical Analysis/Charting Tools</p>
          <p>AI Tools</p>
          <p></p>
        </div>
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit">Login</button>
          <p></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
