
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../Auth_Service/AuthService";
import signupImg from '../../../Assets/images/signup_dataworks.jpg';
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
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await AuthService.register(username, email, password, confirmPassword);
      console.log('API response:', response); // Debugging line
      if (response.status === 201 || response.status === 200) { // Check for successful registration status
        console.log(response);
        
        setIsRegistered(true); // Set registration state to true upon success
      } else {
        setError("Failed to register");
      }
    } catch (error) {
      console.error('Registration error:', error); // Debugging line
      setError("Failed to register");
    }
  };

  const handleOk = () => {
    navigate("/login"); // Redirect to login page when OK button is clicked
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {isRegistered ? (
        <div className="bg-white p-12 rounded-xl shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">Successfully Registered</h2>
          <button onClick={handleOk} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            OK
          </button>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-xl shadow-md w-full max-w-xs">
          <img src={signupImg} alt="Financial Works Logo" className="mx-auto mb-3 w-31 h-14 object-cover" />
          <h2 className="text-xl font-semibold text-center mb-6">Sign Up</h2>
          <form autoComplete="off" onSubmit={handleRegister} className="flex flex-col items-center">
            <div className="mb-3 w-full">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-56 mx-auto px-3 py-1 border rounded-md focus:outline-none bg-gray-200"
              />
            </div>
            <div className="mb-3 w-full">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-56 mx-auto px-3 py-1 border rounded-md focus:outline-none bg-gray-200"
              />
            </div>
            <div className="mb-3 relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-56 mx-auto px-3 py-1 border rounded-md focus:outline-none bg-gray-200"
              />
              {showPassword ? (
                <VisibilityIcon
                  className="absolute right-3 top-1.5 cursor-pointer text-xs"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ fontSize: "20px" }}
                />
              ) : (
                <VisibilityOffIcon
                  className="absolute right-3 top-1.5 cursor-pointer text-xs"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ fontSize: "20px" }}
                />
              )}
            </div>
            <div className="mb-3 relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-56 mx-auto px-3 py-1 border rounded-md focus:outline-none bg-gray-200"
              />
              {showConfirmPassword ? (
                <VisibilityIcon
                  className="absolute right-3 top-1.5 cursor-pointer text-xs"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ fontSize: "20px" }}
                />
              ) : (
                <VisibilityOffIcon
                  className="absolute right-3 top-1.5 cursor-pointer text-xs"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ fontSize: "20px" }}
                />
              )}
            </div>
            <button type="submit" className="w-56 bg-blue-900 text-white px-3 py-1 rounded-md mx-auto">
              Sign-up
            </button>
            <p className="mt-4 text-center text-sm">
              Have an account? <Link to="/login" className="text-blue-500 hover:underline">Login now</Link>
            </p>
            {error && <p className="mt-2 text-center text-blue-500">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default SignupPage;
