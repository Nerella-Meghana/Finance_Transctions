
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthService } from "../Auth_Service/AuthService";
// import loginImg from "../../../Assets/images/login dataworks.jpg";
// import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

// function LoginPage() {
//   const [userName, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const data = await AuthService.login(userName, password);
//       console.log(data.token);
//       if (data.token) {
//         AuthService.setToken(data.token);
//         setError("Successfully logged in!");
//         setTimeout(() => navigate("/home"), 1000); // Redirect after 1 seconds
//       } else {
//         setError("Login failed");
//       }
//     } catch (error) {
//       setError("Check your credentials and try again");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white rounded-lg shadow-md p-8 w-80">
//         <img
//           src={loginImg}
//           alt="Financial Works Logo"
//           className="w-40 mx-auto mb-7"
//         />
//         <h2 className="text-xl font-semibold text-center mb-6">Log in</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div className="flex flex-col space-y-1">
//             <input
//               type="text"
//               placeholder="Enter Username"
//               value={userName}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 p-1 w-70 border rounded-md bg-gray-200 focus:outline-none"
//             />
//           </div>
//           <div className="flex flex-col relative space-y-1">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 p-1 w-70 border rounded-md bg-gray-200 focus:outline-none"
//             />
//             {showPassword ? (
//               <EyeIcon
//                 className="absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               />
//             ) : (
//               <EyeOffIcon
//                 className="absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               />
              
//             )}
//           </div>
//           <Link to="/forgot-password" className="forgot-password-link">
//             Forgot Password?
//           </Link>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white rounded-md py-2"
//           >
//             Log in
//           </button>
//           <p>
//             Not a member? <Link to="/signup" className="text-blue-500 font-semibold">Sign-up now</Link>
//           </p>
//           {error && <p className="text-red-500">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../Auth_Service/AuthService";
import loginImg from "../../../Assets/images/login dataworks.jpg";
import "./LoginPage.css";
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
        setTimeout(() => navigate("/home"), 1000); // Redirect after 1 seconds
      } else {
        setError("Login failed");
      }
    } catch (error) {
      setError("Check your credentials and try again");
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src={loginImg}
          alt="Financial Works Logo"
          className="logo"
        />
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
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
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
          <button type="submit" className="login-button">
            Log in
          </button>
          <p>
            Not a member? <Link to="/signup" className="signup-link">Sign-up now</Link>
          </p>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}
 
export default LoginPage;

