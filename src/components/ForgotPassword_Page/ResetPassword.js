// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
// function ResetPassword() {
//   const navigate = useNavigate();
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
 
//   // Check for email in local storage and redirect if not found
//   useEffect(() => {
//     const storedEmail = localStorage.getItem('email_response');
//     if (!storedEmail) {
//       // If no email is found in local storage, redirect to forgot password page
//       navigate('/forgot-password');
//     }
//   }, [navigate]);
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
 
//     // Validate passwords
//     if (newPassword !== confirmPassword) {
//       setError("Passwords don't match.");
//       return;
//     }
 
//     const email = localStorage.getItem('email_response');
 
//     try {
//       const response = await fetch('http://192.168.0.113:8082/api/reset-password', {  
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, newPassword, confirmPassword }),
//       });
 
//       if (response.ok) {
//         navigate('/login'); // Redirect to login page after successful password reset
//       } else {
//         const errorData = await response.json();
//         console.error('Server responded with an error:', errorData);
//         setError(errorData.message || 'An error occurred. Please try again.');
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setError('An error occurred. Please try again.');
//     }
//   };
 
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md -full md:w-96">
//         <h2 className="text-2xl mb-4 text-center">Reset Password</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="password"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="border border-gray-300 rounded p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="border border-gray-300 rounded p-2 w-full"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
//           >
//             Reset Password
//           </button>
//         </form>
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//       </div>
//     </div>
//   );
// }
 
// export default ResetPassword;
 


function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Check for email in local storage and redirect if not found
  useEffect(() => {
    const storedEmail = localStorage.getItem('email_response');
    if (!storedEmail) {
      // If no email is found in local storage, redirect to forgot password page
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    const email = localStorage.getItem('email_response');

    try {
      const response = await fetch('http://192.168.0.113:8082/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login page after successful password reset
      } else {
        const errorData = await response.json();
        console.error('Server responded with an error:', errorData);
        setError(errorData.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-96 mt-8 mb-8">
        <h2 className="text-3xl mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <p className="mb-4 text-sm text-gray-600"> Enter new password</p>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500 bg-gray-200"
              required
            />
          </div>
          <div className="mb-4">
          <p className="mb-4 text-sm text-gray-600"> Confirm password </p>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 w-80 focus:outline-none focus:border-blue-500 bg-gray-200"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-800 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full"
          >
            Reset Password
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
