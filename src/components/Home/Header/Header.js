
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


