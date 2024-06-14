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

  const handleLogout = () => {
    AuthService.clearToken();
    navigate('/LogoutPage');
  };

  return (
    <header className="bg-white py-1 px-5 flex justify-between items-center border-b shadow-sm h-20 w-full fixed top-0 left-0">
      <div className="logo">
        <img src={headerimg} alt="Financial Works Logo" className="h-12 mt-4 ml-8" />
      </div>
      <div className="flex items-center">
        <div className="mr-5 text-right">
          <p>Full Name</p>
          <p>Designation</p>
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
