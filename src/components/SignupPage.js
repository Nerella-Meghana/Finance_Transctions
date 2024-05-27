import React, { useState } from "react";
import authService from "./authService";
import { Link, useNavigate } from "react-router-dom";
import signupImg from '../Assets/images/signup_dataworks.jpg'; // Add the path to your signup image
import "./SignupPage.css";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await authService.register(username, email, password);
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      setError("Failed to register");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img
          src={signupImg}
          alt="Financial Works Logo"
          className="logo"
        />
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <VisibilityIcon
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <VisibilityOffIcon
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div className="input-group password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {showConfirmPassword ? (
              <VisibilityIcon
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <VisibilityOffIcon
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>
          <button type="submit" className="signup-button">
            Sign-up
          </button>
          <p>
            Have an account? <Link to="/login" className="login-link">Login now</Link>
          </p>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignupPage;