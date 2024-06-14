
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://192.168.0.113:8082/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        localStorage.setItem('email_response', data.email);
        navigate('/verification', { state: { email } });
      } else {
        const errorData = await response.json();
        console.error('Server responded with an error:', errorData); // Log the error response
        setError(errorData.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Fetch error:', error); // Log the fetch error
      setError('An error occurred. Please try again.');
    }
  };
return (
  <div className="flex items-center justify-center h-screen bg-gray-200 mx-auto">
    <div className="bg-white p-12 rounded-xl shadow-md w-full max-w-xs">
      <h2 className="text-xl pt-4 pb-[1rem] flex items-center justify-center font-semibold mb-3">Forgot your password?</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-3 w-full flex justify-center">
        {/* <p className=" mb-4 text-center text-sm">
        Enter your registered email address 
        </p>  */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            required
            className="w-56 px-3 py-1 border rounded-md focus:outline-none bg-gray-200 "
          />
        </div>
        <button
          type="submit"
          className="w-56 bg-blue-900 text-white px-3 py-1 rounded-md"
        >
          Continue
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <p className="mt-4">
        <Link to="/login" className="block mb-4 text-center text-blue-500 text-md hover:underline">Log in</Link>
      </p>
    </div>
  </div>
);
}

export default ForgotPassword;