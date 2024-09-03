import React from 'react';
import './LoginPage.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        {/* Replace with your image URL */}
        <img src="https://via.placeholder.com/600x800" alt="Login" />
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
        </form>
      </div>
    </div>
  );
};

export default Login;
