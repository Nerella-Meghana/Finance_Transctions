
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-12 rounded-xl shadow-md w-full max-w-xs font-semibold " style={{ minHeight: '350px' }}>
        <h2 className="text-xl mb-6 mt-7 text-center">Create a new password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-3 w-full flex justify-center">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-52 px-3 py-1 border rounded-md focus:outline-none bg-gray-200 "
              required
            />
          </div>
          <div className="mb-3 w-full flex justify-center">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-52 px-3 py-1 border rounded-md focus:outline-none bg-gray-200 mb-3 "
              required
            />
          </div>
          <button
            type="submit"
            className="w-52 bg-blue-900 text-white px-3 py-1 rounded-md"
          >
            Reset Password
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
