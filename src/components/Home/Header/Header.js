// import React from 'react';
// import { AuthService } from '../../AuthService/Auth_Service/AuthService';
// import { useNavigate } from 'react-router-dom';
// import './Header.css';
// import headerimg from '../../../Assets/images/Home_img.jpg';

 
// const Header = () => {
//   const navigate = useNavigate();
 
//   const handleLogout = () => {
//     AuthService.clearToken();
//     navigate('/LogoutPage');
//   };
 
//   return (
    
//     <header className="header">
//       <div className="logo">
//         <img src={headerimg} alt="Financial Works Logo" />
//       </div>
//       <div className="user-info">
//         <div className="user-details">
//           <p>Full Name</p>
//           <p>Designation</p>
//         </div>
//         <button onClick={handleLogout} className="logout-button">
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };
 
// export default Header;


// import React from 'react';
// import { AuthService } from '../../AuthService/Auth_Service/AuthService';
// import { useNavigate } from 'react-router-dom';
// import headerimg from '../../../Assets/images/Home_img.jpg';

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     AuthService.clearToken();
//     navigate('/LogoutPage');
//   };

//   return (
//     <header className="bg-white py-1 px-5 flex justify-between items-center border-b-1 shadow-sm h-20 w-full fixed top-0 left-0 mb-[20px]">
//       <div className="logo">
//         <img src={headerimg} alt="Financial Works Logo" className="h-[50px] mt-[16px]" />
//       </div>
//       <div className="flex items-center">
//         <div className="mr-5 text-right">
//           <p>Full Name</p>
//           <p>Designation</p>
//         </div>
//         <button 
//           onClick={handleLogout} 
//           className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React from 'react';
import { AuthService } from '../../AuthService/Auth_Service/AuthService';
import { useNavigate } from 'react-router-dom';
import headerimg from '../../../Assets/images/Home_img.jpg';

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve username from local storage
 
  const handleLogout = () => {
    AuthService.clearToken();
    localStorage.removeItem('username'); // Remove username from local storage on logout
    navigate('/LogoutPage');
  };

  return (
    <header className="bg-white py-1 px-5 flex justify-between items-center border-b shadow-sm h-20 w-full fixed top-0 left-0">
      <div className="logo">
        <img src={headerimg} alt="Financial Works Logo" className="h-12 mt-4" />
      </div>
      <div className="flex items-center">
        <div className="mr-5 text-right">
          <p>Welcome</p>
          <p>{username}</p>
        </div>
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;


// import React from 'react';
// import { useTheme, useThemeUpdate } from '../../../contexts/ThemeContext';
// import { AuthService } from '../../AuthService/Auth_Service/AuthService';
// import { useNavigate } from 'react-router-dom';
// import headerimg from '../../../Assets/images/Home_img.jpg';
// import '../../../styles/styles.css';
// const Header = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const toggleTheme = useThemeUpdate();

//   const handleLogout = () => {
//     AuthService.clearToken();
//     navigate('/LogoutPage');
//   };

//   const handleThemeToggle = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     toggleTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   return (
//     <header className="bg-white py-1 px-5 flex justify-between items-center border-b shadow-sm h-20 w-full fixed top-0 left-0">
//       <div className="logo">
//         <img src={headerimg} alt="Financial Works Logo" className="h-12 mt-4" />
//       </div>
//       <div className="flex items-center">
//         <button 
//           onClick={handleThemeToggle} 
//           className="px-4 py-2 mr-4 bg-gray-300 text-gray-800 cursor-pointer rounded hover:bg-gray-400"
//         >
//           {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
//         </button>
//         <div className="mr-5 text-right">
//           <p>Full Name</p>
//           <p>Designation</p>
//         </div>
//         <button 
//           onClick={handleLogout} 
//           className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;




// Header.js

// import React from 'react';
// import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
// import { useTheme, useThemeUpdate } from '../../../contexts/ThemeContext';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import headerimg from '../../../Assets/images/Home_img.jpg'; // Ensure your image path is correct

// const Header = () => {
//   const theme = useTheme();
//   const toggleTheme = useThemeUpdate();

//   const handleThemeToggle = () => {
//     const newTheme = theme === lightTheme ? 'dark' : 'light';
//     toggleTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   return (
//     <AppBar position="fixed">
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Financial Works
//         </Typography>
//         <IconButton color="inherit" onClick={handleThemeToggle}>
//           {theme === lightTheme ? <Brightness4Icon /> : <Brightness7Icon />}
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;



// import React from 'react';
// import { useTheme, useThemeUpdate } from '../../../contexts/ThemeContext';
// import { AuthService } from '../../AuthService/Auth_Service/AuthService';
// import { useNavigate } from 'react-router-dom';
// import headerimg from '../../../Assets/images/Home_img.jpg';
// import '../../../styles/styles.css';

// const Header = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const toggleTheme = useThemeUpdate();

//   const handleLogout = () => {
//     AuthService.clearToken();
//     navigate('/LogoutPage');
//   };

//   const handleThemeToggle = () => {
//     toggleTheme(); // Toggle theme using the context function
//   };

//   return (
//     <header className="bg-white py-1 px-5 flex justify-between items-center border-b shadow-sm h-20 w-full fixed top-0 left-0">
//       <div className="logo">
//         <img src={headerimg} alt="Financial Works Logo" className="h-12 mt-4" />
//       </div>
//       <div className="flex items-center">
//         <button 
//           onClick={handleThemeToggle} 
//           className={`px-4 py-2 mr-4 ${theme === 'light' ? 'bg-gray-300 text-gray-800' : 'bg-gray-700 text-white'} cursor-pointer rounded hover:bg-gray-400`}
//         >
//           {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
//         </button>
//         <div className="mr-5 text-right">
//           <p>Full Name</p>
//           <p>Designation</p>
//         </div>
//         <button 
//           onClick={handleLogout} 
//           className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;



// Header.js

// import React from 'react';
// import { useTheme, useThemeUpdate } from '../../../contexts/ThemeContext';
// import { AuthService } from '../../AuthService/Auth_Service/AuthService';
// import { useNavigate } from 'react-router-dom';
// import headerimg from '../../../Assets/images/Home_img.jpg';
// import '../../../styles/styles.css';

// const Header = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const toggleTheme = useThemeUpdate();

//   const handleLogout = () => {
//     AuthService.clearToken();
//     navigate('/LogoutPage');
//   };

//   const handleThemeToggle = () => {
//     toggleTheme();
//   };

//   return (
//     <header className={`bg-white py-1 px-5 flex justify-between items-center border-b shadow-sm h-20 w-full fixed top-0 left-0 ${theme}`}>
//       <div className="logo">
//         <img src={headerimg} alt="Financial Works Logo" className="h-12 mt-4" />
//       </div>
//       <div className="flex items-center">
//         <button 
//           onClick={handleThemeToggle} 
//           className={`px-4 py-2 mr-4 ${theme === 'light' ? 'bg-gray-300 text-gray-800' : 'bg-gray-700 text-white'} cursor-pointer rounded hover:bg-gray-400`}
//         >
//           {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
//         </button>
//         <div className="mr-5 text-right">
//           <p>Full Name</p>
//           <p>Designation</p>
//         </div>
//         <button 
//           onClick={handleLogout} 
//           className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


