
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthService } from "../Auth_Service/AuthService"; 
// import signupImg from '../../../Assets/images/signup_dataworks.jpg';
// import './SignupPage.css';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import VisibilityIcon from '@mui/icons-material/Visibility';

// function SignupPage() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isRegistered, setIsRegistered] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (event) => {
//     event.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await AuthService.register(username, email, password, confirmPassword);
//       console.log('API response:', response); // Debugging line
//       if (response.status === 201 || response.status === 200 ) { // Check for successful registration status
//         console.log(response);
//         const userResponseId = response.data.id;

//         localStorage.setItem('user_id_response', userResponseId);
//         setIsRegistered(true); // Set registration state to true upon success
//       } else {
//         setError("Failed to register");
//       }
//     } catch (error) {
//       console.error('Registration error:', error); // Debugging line
//       setError("Failed to register");
//     }
//   };

//   const handleOk = () => {
//     navigate("/login"); // Redirect to login page when OK button is clicked
//   };

//   return (
//     <div className="signup-container">
//       {isRegistered ? (
//         <div className="success-message">
//           <h2>Successfully Registered</h2>
//           <button onClick={handleOk} className="ok-button">OK</button>
//         </div>
//       ) : (
//         <div className="signup-box">
//           <img src={signupImg} alt="Financial Works Logo" className="logo" />
//           <h2>Sign Up</h2>
//           <form onSubmit={handleRegister}>
//             <div className="input-group">
//               <input
//                 type="text"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="input-group">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="input-group password-input">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               {showPassword ? (
//                 <VisibilityIcon
//                   className="password-toggle-icon"
//                   onClick={() => setShowPassword(!showPassword)}
//                 />
//               ) : (
//                 <VisibilityOffIcon
//                   className="password-toggle-icon"
//                   onClick={() => setShowPassword(!showPassword)}
//                 />
//               )}
//             </div>
//             <div className="input-group password-input">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Re-enter password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               {showConfirmPassword ? (
//                 <VisibilityIcon
//                   className="password-toggle-icon"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 />
//               ) : (
//                 <VisibilityOffIcon
//                   className="password-toggle-icon"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 />
//               )}
//             </div>
//             <button type="submit" className="signup-button">
//               Sign-up
//             </button>
//             <p>
//               Have an account? <Link to="/login" className="login-link">Login now</Link>
//             </p>
//             {error && <p className="error-message">{error}</p>}
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SignupPage;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthService } from "../Auth_Service/AuthService";
// import signupImg from '../../../Assets/images/signup_dataworks.jpg';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import VisibilityIcon from '@mui/icons-material/Visibility';

// function SignupPage() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isRegistered, setIsRegistered] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (event) => {
//     event.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await AuthService.register(username, email, password, confirmPassword);
//       console.log('API response:', response); // Debugging line
//       if (response.status === 201 || response.status === 200) { // Check for successful registration status
//         console.log(response);
//         const userResponseId = response.data.id;

//         localStorage.setItem('user_id_response', userResponseId);
//         setIsRegistered(true); // Set registration state to true upon success
//       } else {
//         setError("Failed to register");
//       }
//     } catch (error) {
//       console.error('Registration error:', error); // Debugging line
//       setError("Failed to register");
//     }
//   };

//   const handleOk = () => {
//     navigate("/login"); // Redirect to login page when OK button is clicked
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       {isRegistered ? (
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h2 className="text-2xl font-bold mb-4">Successfully Registered</h2>
//           <button onClick={handleOk} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//             OK
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//           <img src={signupImg} alt="Financial Works Logo" className="mx-auto mb-4 w-38 h-20 object-cover" />
//           <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
//           <form autocomplete="off" onSubmit={handleRegister}>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="w-80 h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
//               />
//             </div>
//             <div className="mb-4">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-80 h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
//               />
//             </div>
//             <div className="mb-4 relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-80 h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
//               />
//               {showPassword ? (
//                 <VisibilityIcon
//                   className="absolute right-3 top-3 cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 />
//               ) : (
//                 <VisibilityOffIcon
//                   className="absolute right-3 top-3 cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 />
//               )}
//             </div>
//             <div className="mb-4 relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Re-enter password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-80 h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
//               />
//               {showConfirmPassword ? (
//                 <VisibilityIcon
//                   className="absolute right-3 top-3 cursor-pointer"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 />
//               ) : (
//                 <VisibilityOffIcon
//                   className="absolute right-3 top-3 cursor-pointer"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 />
//               )}
//             </div>
//             <button type="submit" className="w-80 h-12 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//               Sign-up
//             </button>
//             <p className="mt-4 text-center">
//               Have an account? <Link to="/login" className="text-blue-500 hover:underline">Login now</Link>
//             </p>
//             {error && <p className="mt-2 text-center text-red-500">{error}</p>}
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SignupPage;




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
        const userResponseId = response.data.id;

        localStorage.setItem('user_id_response', userResponseId);
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {isRegistered ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Successfully Registered</h2>
          <button onClick={handleOk} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            OK
          </button>
        </div>
      ) : (
        <div className="bg-white pl-20 pr-20 pt-10 pb-10 rounded-lg shadow-md max-w-md">
          <img src={signupImg} alt="Financial Works Logo" className="mx-auto mb-4 w-38 h-20 object-cover" />
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form autoComplete="off" onSubmit={handleRegister} className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-64 h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
              />
            </div>
            <div className="mb-4 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-64 h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
              />
            </div>
            <div className="mb-4 relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-64 h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
              />
              {showPassword ? (
                <VisibilityIcon
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <VisibilityOffIcon
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <div className="mb-4 relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-64 h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
              />
              {showConfirmPassword ? (
                <VisibilityIcon
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <VisibilityOffIcon
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>
            <button type="submit" className="w-64 h-10 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Sign-up
            </button>
            <p className="mt-4 text-center">
              Have an account? <Link to="/login" className="text-blue-500 hover:underline">Login now</Link>
            </p>
            {error && <p className="mt-2 text-center text-red-500">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default SignupPage;
