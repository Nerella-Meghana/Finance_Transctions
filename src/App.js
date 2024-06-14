
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./components/AuthService/Login_Page/LoginPage";
// import SignupPage from "./components/AuthService/Signup_Page/SignupPage";
// import HomePage from "./components/Home/Home_Page/HomePage";
// import LogoutPage from "./components/AuthService/Auth_Service/Logout_Page/LogoutPage";
// import AddNew from "./components/Home/Sidebar/Dashboard/Transactions/AddNew";
// import Layout from "./components/Home/Layout/Layout"; // Import the Layout component
// import ForgotPassword from "./components/ForgotPassword_Page/ForgotPassword";
// import VerificationPage from "./components/AuthService/Auth_Service/VerificationPage/VerificationPage"; // Import VerificationPage
// import ResetPassword from "./components/ForgotPassword_Page/ResetPassword";


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/home/*" element={<Layout><HomePage /></Layout>} />
//         <Route path="/logoutPage" element={<LogoutPage />} />
//         <Route path="add-new" element={<AddNew />}/>
//         <Route path="add-new/:id" element={<AddNew />}/>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verification" element={<VerificationPage />} /> {/* Add the VerificationPage route */}
//         <Route path="/reset-password" element={<ResetPassword />}/>
//       </Routes>
//     </Router>
//   );
// }


// export default App




// src/App.js

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./components/AuthService/Login_Page/LoginPage";
// import SignupPage from "./components/AuthService/Signup_Page/SignupPage";
// import HomePage from "./components/Home/Home_Page/HomePage";
// import LogoutPage from "./components/AuthService/Auth_Service/Logout_Page/LogoutPage";
// import Transactions from "./components/Home/Sidebar/Dashboard/Transactions/Transactions"; // Import the Transactions component
// import Layout from "./components/Home/Layout/Layout"; // Import the Layout component
// import ForgotPassword from "./components/ForgotPassword_Page/ForgotPassword";
// import VerificationPage from "./components/AuthService/Auth_Service/VerificationPage/VerificationPage"; // Import VerificationPage
// import ResetPassword from "./components/ForgotPassword_Page/ResetPassword";


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/home/*" element={<Layout><HomePage /></Layout>} />
//         <Route path="/logoutPage" element={<LogoutPage />} />
//         <Route path="/home/transactions" element={<Transactions />} /> {/* Updated Transactions path */}
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verification" element={<VerificationPage />} /> {/* Add the VerificationPage route */}
//         <Route path="/reset-password" element={<ResetPassword />}/>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/AuthService/Login_Page/LoginPage";
import SignupPage from "./components/AuthService/Signup_Page/SignupPage";
import HomePage from "./components/Home/Home_Page/HomePage";
import LogoutPage from "./components/AuthService/Auth_Service/Logout_Page/LogoutPage";
import AddNew from "./components/Home/Sidebar/Dashboard/Transactions/AddNew";
import Layout from "./components/Home/Layout/Layout"; // Import the Layout component
import ForgotPassword from "./components/ForgotPassword_Page/ForgotPassword";
import VerificationPage from "./components/AuthService/Auth_Service/VerificationPage/VerificationPage"; // Import VerificationPage
import ResetPassword from "./components/ForgotPassword_Page/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home/*" element={<Layout><HomePage /></Layout>} />
        <Route path="/logoutPage" element={<LogoutPage />} />
        <Route path="/add-new" element={<Layout><AddNew /></Layout>} />
        <Route path="/add-new/:id" element={<Layout><AddNew /></Layout>} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verification" element={<VerificationPage />} /> {/* Add the VerificationPage route */}
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
