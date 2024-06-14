
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../Auth_Service/AuthService";
import loginImg from "../../../Assets/images/login dataworks.jpg";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function LoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await AuthService.login(userName, password);
      console.log(data.token);
      
      if (data.token) {
        AuthService.setToken(data.token);
        setError("Successfully logged in!");
        setTimeout(() => navigate("/home"), 1000); // Redirect after 1 second
      } else {
        setError("Login failed");
      }
    } catch (error) {
      setError("Check your credentials and try again");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-12 rounded-xl shadow-md w-full max-w-xs">
        <img
          src={loginImg} 
          alt="Financial Works Logo"
          className="mx-auto mb-3 w-31 h-14 object-cover"
          
        />
      
        <h2 className="text-xl font-semibold text-center mb-6">Log in</h2>
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-56 px-3 py-1 border rounded-md focus:outline-none bg-gray-200"
            />
          </div>
          <div className="mb-3 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className=" w-56 px-3 py-1 border rounded-md focus:outline-none bg-gray-200"
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
          <Link to="/forgot-password" className="block mb-4 text-right text-blue-500 text-sm hover:underline ">
            Forgot Password?
          </Link>
          <button type="submit" className="w-56 bg-blue-900 text-white px-3 py-1 rounded-md">
            Log in
          </button>
          <p className="mt-4 text-center text-sm">
            Not a member? <Link to="/signup" className="text-blue-500 text-sm hover:underline">Sign-up now</Link>
          </p>
          {error && <p className="mt-2 text-center text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;



