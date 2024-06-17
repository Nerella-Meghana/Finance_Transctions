// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
 
// const OtpInput = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const navigate = useNavigate();
//   const emailpayload = localStorage.getItem('email_response');
//   const inputRefs = [useRef(), useRef(), useRef(), useRef()];
 
//   const handleSubmit = () => {
//     const enteredOTP = otp.join('');
//     fetch('http://192.168.0.113:8082/api/verify-otp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ otp: enteredOTP, email: emailpayload }),
//     })
//     .then(response => {
//       if (response.ok) {
//         alert('OTP verified successfully!');
//         navigate('/reset-password'); // Navigate to the reset password page
//       } else {
//         alert('Failed to verify OTP. Please try again.');
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       alert('Failed to verify OTP. Please check your network connection and try again.');
//     });
//   };
 
//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!isNaN(value) && value.length <= 1) {
//       let newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
     
//       // Move focus to the next input automatically
//       if (value && index < 3) {
//         inputRefs[index + 1].current.focus();
//       }
//     }
//   };
 
//   return (
//     <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-200">
//       <div className="bg-white shadow-md rounded-lg  pt-20 pb-20 pl-10 pr-10"> {/* Add styling to the wrapping div */}
//         <h2 className="text-2xl font-semibold mb-3">Enter verification code</h2>
//         <p className="text-gray-600 mb-6 text-sm">We have sent 4 digits of OTP to your registered email address</p>
//         <form className="flex justify-center gap-4 mb-4 flex-row">
//           {otp.map((value, index) => (
//             <input
//               key={index}
//               type="text"
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               maxLength="1"
//               ref={inputRefs[index]} // Assign ref to input field
//               className="w-12 h-12 mb-5 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
//             />
//           ))}
//         </form>
//         <button onClick={handleSubmit} className="bg-indigo-900 text-white font-semibold px-8 py-2 rounded-md hover:bg-indigo-800 transition duration-300 h-30 w-60">
//           Continue
//         </button>
//         <p className="mt-4 text-gray-600">If you haven't received a code, <span className="text-blue-500 cursor-pointer hover:underline">Resend</span></p>
//         <p className="mt-2"><a href="/signup" className="text-blue-500 cursor-pointer hover:underline">Sign-up now</a></p>
//       </div>
//     </div>
//   );
// };
 
// export default OtpInput;
 


// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Modal = ({ isOpen, message, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-lg text-center">
//         <h4 className="mb-3">{message}</h4>
//         <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">OK</button>
//       </div>
//     </div>
//   );
// };

// const OtpInput = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const navigate = useNavigate();
//   const emailpayload = localStorage.getItem('email_response');
//   const inputRefs = [useRef(), useRef(), useRef(), useRef()];
//   const [modal, setModal] = useState({ isOpen: false, message: '' });

//   const handleSubmit = () => {
//     const enteredOTP = otp.join('');
//     fetch('http://192.168.0.113:8082/api/verify-otp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ otp: enteredOTP, email: emailpayload }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         setModal({ isOpen: true, message: 'OTP verified successfully!' });
//         setTimeout(() => {
//           navigate('/reset-password'); // Navigate after closing the modal
//         }, 3000);
//       } else {
//         setModal({ isOpen: true, message: 'Failed to verify OTP. Please try again.' });
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       setModal({ isOpen: true, message: 'Failed to verify OTP. Please check your network connection and try again.' });
//     });
//   };

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!isNaN(value) && value.length === 1) {
//       let newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
      
//       // Move focus to the next input automatically
//       if (value && index < 3) {
//         inputRefs[index + 1].current.focus();
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-200">
//       <div className="bg-white shadow-md rounded-lg  pt-20 pb-20 pl-10 pr-10">
//         <h2 className="text-2xl font-semibold mb-3">Enter verification code</h2>
//         <p className="text-gray-600 mb-6 text-sm">We have sent 4 digits of OTP to your registered email address</p>
//         <form className="flex justify-center gap-4 mb-4 flex-row">
//           {otp.map((value, index) => (
//             <input
//               key={index}
//               type="text"
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               maxLength="1"
//               ref={inputRefs[index]}
//               className="w-12 h-12 mb-5 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
//             />
//           ))}
//         </form>
//         <button onClick={handleSubmit} className="bg-indigo-900 text-white font-semibold px-8 py-2 rounded-md hover:bg-indigo-800 transition duration-300 h-30 w-60">
//           Continue
//         </button>
//         <p className="mt-4 text-gray-600">If you haven't received a code, <span className="text-blue-500 cursor-pointer hover:underline">Resend</span></p>
//         <p className="mt-2"><a href="/signup" className="text-blue-500 cursor-pointer hover:underline">Sign-up now</a></p>
//       </div>
//       <Modal isOpen={modal.isOpen} message={modal.message} onClose={() => setModal({ ...modal, isOpen: false })} />
//     </div>
//   );
// };

// export default OtpInput;



// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Modal = ({ isOpen, message, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-lg text-center">
//         <h4 className="mb-3">{message}</h4>
//         <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">OK</button>
//       </div>
//     </div>
//   );
// };

// const OtpInput = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const navigate = useNavigate();
//   const emailpayload = localStorage.getItem('email_response');
//   const inputRefs = [useRef(), useRef(), useRef(), useRef()];
//   const [modal, setModal] = useState({ isOpen: false, message: '' });
//   const [resendButton, setResendButton] = useState('Resend');
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const intervalRef = useRef(null);

//   const handleResendClick = () => {
//     setResendButton(`Sent`);
//     setResendDisabled(true);
//     setCountdown(30);
//     intervalRef.current = setInterval(() => {
//       setCountdown(prevCount => prevCount - 1);
//     }, 1000);
//   };

//   useEffect(() => {
//     if (countdown <= 0) {
//       clearInterval(intervalRef.current);
//       setResendButton('Resend');
//       setResendDisabled(false);
//     } else {
//       setResendButton(`Sent ${countdown}`);
//     }
//   }, [countdown]);

//   useEffect(() => {
//     return () => clearInterval(intervalRef.current);  // Cleanup on component unmount
//   }, []);

//   const handleSubmit = () => {
//     const enteredOTP = otp.join('');
//     fetch('http://192.168.0.113:8082/api/verify-otp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ otp: enteredOTP, email: emailpayload }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         setModal({ isOpen: true, message: 'OTP verified successfully!' });
//         setTimeout(() => {
//           navigate('/reset-password'); // Navigate after closing the modal
//         }, 3000);
//       } else {
//         setModal({ isOpen: true, message: 'Failed to verify OTP. Please try again.' });
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       setModal({ isOpen: true, message: 'Failed to verify OTP. Please check your network connection and try again.' });
//     });
//   };

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!isNaN(value) && value.length === 1) {
//       let newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
      
//       // Move focus to the next input automatically
//       if (value && index < 3) {
//         inputRefs[index + 1].current.focus();
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-200">
//       <div className="bg-white shadow-md rounded-lg pt-20 pb-20 pl-10 pr-10">
//         <h2 className="text-2xl font-semibold mb-3">Enter verification code</h2>
//         <p className="text-gray-600 mb-6 text-sm">We have sent 4 digits of OTP to your registered email address</p>
//         <form className="flex justify-center gap-4 mb-4 flex-row">
//           {otp.map((value, index) => (
//             <input
//               key={index}
//               type="text"
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               maxLength="1"
//               ref={inputRefs[index]}
//               className="w-12 h-12 mb-5 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
//             />
//           ))}
//         </form>
//         <button onClick={handleSubmit} className="bg-indigo-900 text-white font-semibold px-8 py-2 rounded-md hover:bg-indigo-800 transition duration-300 h-30 w-60">
//           Continue
//         </button>
//         <p className="mt-4 text-gray-600">If you haven't received a code, <span className={`text-blue-500 cursor-pointer hover:underline ${resendDisabled ? 'cursor-not-allowed text-gray-400' : ''}`} onClick={!resendDisabled && handleResendClick}>{resendButton}</span></p>
//         <p className="mt-2"><a href="/signup" className="text-blue-500 cursor-pointer hover:underline">Sign-up now</a></p>
//       </div>
//       <Modal isOpen={modal.isOpen} message={modal.message} onClose={() => setModal({ ...modal, isOpen: false })} />
//     </div>
//   );
// };

// export default OtpInput;




// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Modal = ({ isOpen, message, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-lg text-center">
//         <h4 className="mb-3">{message}</h4>
//         <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">OK</button>
//       </div>
//     </div>
//   );
// };

// const OtpInput = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const navigate = useNavigate();
//   const emailpayload = localStorage.getItem('email_response');
//   const inputRefs = [useRef(), useRef(), useRef(), useRef()];
//   const [modal, setModal] = useState({ isOpen: false, message: '' });
//   const [resendButton, setResendButton] = useState('Resend');
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const intervalRef = useRef(null);

//   const handleResendClick = () => {
//     setResendButton(`Sent (30)`);
//     setResendDisabled(true);
//     setCountdown(30);
//     intervalRef.current = setInterval(() => {
//       setCountdown(prevCount => prevCount - 1);
//     }, 1000);
//   };

//   useEffect(() => {
//     if (countdown <= 0) {
//       clearInterval(intervalRef.current);
//       setResendButton('Resend');
//       setResendDisabled(false);
//     } else {
//       setResendButton(`Sent (${countdown})`);
//     }
//   }, [countdown]);

//   useEffect(() => {
//     return () => clearInterval(intervalRef.current);  // Cleanup on component unmount
//   }, []);

//   const handleSubmit = () => {
//     const enteredOTP = otp.join('');
//     fetch('http://192.168.0.113:8082/api/verify-otp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ otp: enteredOTP, email: emailpayload }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         setModal({ isOpen: true, message: 'OTP verified successfully!' });
//         setTimeout(() => {
//           navigate('/reset-password'); // Navigate after closing the modal
//         }, 3000);
//       } else {
//         setModal({ isOpen: true, message: 'Failed to verify OTP. Please try again.' });
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       setModal({ isOpen: true, message: 'Failed to verify OTP. Please check your network connection and try again.' });
//     });
//   };

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!isNaN(value) && value.length === 1) {
//       let newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
      
//       // Move focus to the next input automatically
//       if (value && index < 3) {
//         inputRefs[index + 1].current.focus();
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-200">
//       <div className="bg-white shadow-md rounded-lg pt-20 pb-20 pl-10 pr-10">
//         <h2 className="text-2xl font-semibold mb-3">Enter verification code</h2>
//         <p className="text-gray-600 mb-6 text-sm">We have sent 4 digits of OTP to your registered email address</p>
//         <form className="flex justify-center gap-4 mb-4 flex-row">
//           {otp.map((value, index) => (
//             <input
//               key={index}
//               type="text"
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               maxLength="1"
//               ref={inputRefs[index]}
//               className="w-12 h-12 mb-5 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
//             />
//           ))}
//         </form>
//         <button onClick={handleSubmit} className="bg-indigo-900 text-white font-semibold px-8 py-2 rounded-md hover:bg-indigo-800 transition duration-300 h-30 w-60">
//           Continue
//         </button>
//         <p className="mt-4 text-gray-600">If you haven't received a code, <span className={`text-blue-500 cursor-pointer hover:underline ${resendDisabled ? 'cursor-not-allowed text-gray-400' : ''}`} onClick={!resendDisabled && handleResendClick}>{resendButton}</span></p>
//         <p className="mt-2"><a href="/signup" className="text-blue-500 cursor-pointer hover:underline">Sign-up now</a></p>
//       </div>
//       <Modal isOpen={modal.isOpen} message={modal.message} onClose={() => setModal({ ...modal, isOpen: false })} />
//     </div>
//   );
// };

// export default OtpInput;





// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Modal = ({ isOpen, message, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-lg text-center">
//         <h4 className="mb-3">{message}</h4>
//         <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">OK</button>
//       </div>
//     </div>
//   );
// };

// const OtpInput = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const navigate = useNavigate();
//   const emailpayload = localStorage.getItem('email_response');
//   const inputRefs = [useRef(), useRef(), useRef(), useRef()];
//   const [modal, setModal] = useState({ isOpen: false, message: '' });
//   const [resendText, setResendText] = useState('Resend');
//   const [resendColor, setResendColor] = useState('text-red-500');
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const intervalRef = useRef(null);

//   const handleResendClick = () => {
//     setResendText('30 sec');
//     setResendColor('text-green-500');
//     setResendDisabled(true);
//     let countdown = 30; // Countdown from 30 seconds
//     intervalRef.current = setInterval(() => {
//       if (countdown === 1) {
//         clearInterval(intervalRef.current);
//         setResendText('Resend');
//         setResendColor('text-red-500');
//         setResendDisabled(false);
//       } else {
//         countdown--;
//         setResendText(`${countdown} sec`);
//       }
//     }, 1000);
//   };

//   const handleSubmit = () => {
//     const enteredOTP = otp.join('');
//     fetch('http://192.168.0.113:8082/api/verify-otp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ otp: enteredOTP, email: emailpayload }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         setModal({ isOpen: true, message: 'OTP verified successfully!' });
//         setTimeout(() => {
//           navigate('/reset-password');
//         }, 3000);
//       } else {
//         setModal({ isOpen: true, message: 'Failed to verify OTP. Please try again.' });
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       setModal({ isOpen: true, message: 'Failed to verify OTP. Please check your network connection and try again.' });
//     });
//   };

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!isNaN(value) && value.length === 1) {
//       let newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       if (value && index < 3) {
//         inputRefs[index + 1].current.focus();
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-200">
//       <div className="bg-white shadow-md rounded-lg pt-20 pb-20 pl-10 pr-10">
//         <h2 className="text-2xl font-semibold mb-3">Enter verification code</h2>
//         <p className="text-gray-600 mb-6 text-sm">We have sent 4 digits of OTP to your registered email address</p>
//         <form className="flex justify-center gap-4 mb-4 flex-row">
//           {otp.map((value, index) => (
//             <input
//               key={index}
//               type="text"
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               maxLength="1"
//               ref={inputRefs[index]}
//               className="w-12 h-12 mb-5 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
//             />
//           ))}
//         </form>
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-900 text-white font-semibold px-3 py-1 rounded-md transition duration-300 h-12 w-60"
//         >
//           Continue
//         </button>
//         <p className="mt-4 text-gray-600 text-sm">
//           If you haven't received a code,{' '}
//           <span
//             className={`cursor-pointer hover:underline ${resendColor} ${resendDisabled ? 'cursor-not-allowed text-gray-400' : ''}`}
//             onClick={!resendDisabled ? handleResendClick : null}
//           >
//             {resendText}
//           </span>
//         </p>
//         <p className="mt-2">
//           <a href="/signup" className="text-blue-500 cursor-pointer hover:underline">
//             Sign-up now
//           </a>
//         </p>
//       </div>
//       <Modal isOpen={modal.isOpen} message={modal.message} onClose={() => setModal({ ...modal, isOpen: false })} />
//     </div>
//   );
// };

// export default OtpInput;




// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Typography, TextField, Link, Box, CircularProgress } from '@mui/material';
// import Modal from '@mui/material/Modal';

// const OtpInput = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const emailPayload = localStorage.getItem('email_response');
//   const inputRefs = [useRef(), useRef(), useRef(), useRef()];
//   const [modal, setModal] = useState({ isOpen: false, message: '' });
//   const [resendButton, setResendButton] = useState('Resend');
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const intervalRef = useRef(null);

//   const handleResendClick = () => {
//     setResendButton('Sent');
//     setResendDisabled(true);
//     setCountdown(30);
//     intervalRef.current = setInterval(() => {
//       setCountdown(prevCount => prevCount - 1);
//     }, 1000);
//   };

//   useEffect(() => {
//     if (countdown <= 0) {
//       clearInterval(intervalRef.current);
//       setResendButton('Resend');
//       setResendDisabled(false);
//     } else {
//       setResendButton(`Sent ${countdown}`);
//     }
//   }, [countdown]);

//   useEffect(() => {
//     return () => clearInterval(intervalRef.current);  // Cleanup on component unmount
//   }, []);

//   const handleSubmit = () => {
//     setLoading(true);
//     const enteredOTP = otp.join('');
//     fetch('/api/verify-otp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ otp: enteredOTP, email: emailPayload }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       setLoading(false);
//       if (data.success) {
//         setModal({ isOpen: true, message: 'OTP verified successfully!' });
//         setTimeout(() => {
//           navigate('/reset-password'); // Navigate after closing the modal
//         }, 3000);
//       } else {
//         setModal({ isOpen: true, message: 'Failed to verify OTP. Please try again.' });
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       setLoading(false);
//       setModal({ isOpen: true, message: 'Failed to verify OTP. Please check your network connection and try again.' });
//     });
//   };

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!isNaN(value) && value.length <= 1) {
//       let newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
     
//       // Move focus to the next input automatically
//       if (value && index < 3) {
//         inputRefs[index + 1].current.focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace') {
//       if (otp[index] === '' && index > 0) {
//         inputRefs[index - 1].current.focus();
//       } else {
//         let newOtp = [...otp];
//         newOtp[index] = '';
//         setOtp(newOtp);
//       }
//     }
//   };

//   const modalCloseHandler = () => {
//     setModal({ isOpen: false, message: '' });
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#EEEEEE">
//       <Box p={4} bgcolor="white" boxShadow={2} borderRadius={4} textAlign="center" style={{ width: '360px', height: '430px' }}>
//         <Typography variant="h5" marginTop={2} gutterBottom>
//           Enter verification code
//         </Typography>
//         <Typography variant="body1" color="textPrimary" marginTop={4} gutterBottom>
//           We have sent 4 digits of OTP to your registered email address
//         </Typography>
//         <Box display="flex" justifyContent="center" marginBottom={6} marginTop={2}>
//           {otp.map((value, index) => (
//             <TextField
//               key={index}
//               type="text"
//               variant="outlined"
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               inputProps={{ maxLength: 1 }}
//               inputRef={inputRefs[index]}
//               className="otp-input"
//               style={{ width: 45, height: 30, margin: '10px 5px', textAlign: 'center' }}
//             />
//           ))}
//         </Box>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           style={{ width: 200, height: 40, marginBottom: 20 }}
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={24} color="inherit"/> : "Continue"}
//         </Button>
//         <Typography variant="body2" color="textPrimary" gutterBottom>
//           If you haven't received a code,{' '}
//           <span
//             className={`text-blue-500 cursor-pointer hover:underline ${resendDisabled ? 'cursor-not-allowed text-gray-400' : ''}`}
//             onClick={!resendDisabled && handleResendClick}
//           >
//             {resendButton}
//           </span>
//         </Typography>
//         <Typography variant="body2" gutterBottom>
//           <Link href="/signup" className="text-blue-500 cursor-pointer hover:underline">
//             Sign-up now
//           </Link>
//         </Typography>
//       </Box>
//       <Modal open={modal.isOpen} onClose={modalCloseHandler}>
//         <Box p={4} bgcolor="white" boxShadow={4} borderRadius={8} textAlign="center" style={{ width: '300px', margin: 'auto' }}>
//           <Typography variant="h6" gutterBottom>
//             {modal.message}
//           </Typography>
//           <Button variant="contained" color="primary" onClick={modalCloseHandler} style={{ marginTop: 20 }}>
//             OK
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default OtpInput;




// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Typography, TextField, CircularProgress, Box, Modal, Container } from '@mui/material';
// import { finappaxios } from '../../axios';

// const OtpInput = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const emailPayload = localStorage.getItem('email_response');
//   const inputRefs = [useRef(), useRef(), useRef(), useRef()];
//   const [modal, setModal] = useState({ isOpen: false, message: '' });
//   const [resendText, setResendText] = useState('Resend');
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const intervalRef = useRef(null);

//   const handleResendClick = () => {
//     setResendText('30 sec');
//     setResendDisabled(true);
//     let countdown = 30;
//     intervalRef.current = setInterval(() => {
//       if (countdown === 1) {
//         clearInterval(intervalRef.current);
//         setResendText('Resend');
//         setResendDisabled(false);
//       } else {
//         countdown--;
//         setResendText(`${countdown} sec`);
//       }
//     }, 1000);
//   };

//   const handleSubmit = () => {
//     setLoading(true);
//     const enteredOTP = otp.join('');
//     fetch('http://192.168.0.113:8082/api/verify-otp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ otp: enteredOTP, email: emailPayload }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         setLoading(false);
//         if (data.success) {
//           setModal({ isOpen: true, message: 'OTP verified successfully!' });
//           setTimeout(() => {
//             navigate('/reset-password');
//           }, 3000);
//         } else {
//           setModal({ isOpen: true, message: 'Failed to verify OTP. Please try again.' });
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setLoading(false);
//         setModal({ isOpen: true, message: 'Failed to verify OTP. Please check your network connection and try again.' });
//       });
//   };

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!isNaN(value) && value.length === 1) {
//       let newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       if (value && index < 3) {
//         inputRefs[index + 1].current.focus();
//       }
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       height="100vh"
     
//       sx={{ bgcolor: '#EEEEEE' }}
//     >
//       <Container
//         maxWidth="xs"
//         sx={{
//           bgcolor: 'white',
//           p: 4,
//           borderRadius: 4,
//           boxShadow: 1,
//           textAlign: 'center',
//           width: '360px',
//           height: '430px',
//         }}
//       >
//         <Typography variant="h5" sx={{ mb: 3 , mt:3}}>Enter verification code</Typography>
//         <Typography variant="body2" sx={{ color: 'text.Primary', mb: 4 }}>
//           We have sent 4 digits of OTP to your<br></br>registered email address
//         </Typography>
//         <Box component="form" sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 5 }}>
//           {otp.map((value, index) => (
//             <TextField
//               key={index}
//               type="text"
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
//               inputRef={inputRefs[index]}
//               variant="outlined"
//               sx={{ width: '2.7rem', height: '2.5rem', fontSize: '1.25rem' }}
//             />
//           ))}
//         </Box>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           disabled={loading}
//           sx={{
//             width: "210px", // Adjust width as needed
//             marginLeft: '4px',
//             marginBottom: '20px',// Adjust margin left as needed
//             height: '40px', // Adjust height as needed
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Custom box shadow
//             bgcolor: '#1A237E',

//             '&:hover': {
//               bgcolor: "#1565c0", // Darker blue on hover
//             },
//             '&:focus': {
//               bgcolor: "#1976d2", // Blue on focus
//             },
//             '&.Mui-disabled': {
//               bgcolor: "#1976d2", // Blue when disabled
//             },
//           }}
//         >
//           {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
//         </Button>
//         <Typography variant="body2" sx={{ color: 'text.Primary', mb: 2 }}>
//           If you haven't received a code,{' '}
//           <span
//             style={{ cursor: !resendDisabled ? 'pointer' : 'not-allowed', color: resendDisabled ? '#999' : '#d32f2f' }}
//             onClick={!resendDisabled ? handleResendClick : null}
//           >
//             {resendText}
//           </span>
//         </Typography>
//         <Typography variant="body2">
//           <a href="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
//             Sign-up now
//           </a>
//         </Typography>
//       </Container>
//       <Modal open={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })}>
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0, 0, 0, 0.5)' }}
//         >
//           <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
//             <Typography sx={{ mb: 3 }}>{modal.message}</Typography>
//             <Button
//               onClick={() => setModal({ ...modal, isOpen: false })}
//               sx={{
//                 bgcolor: '#1A237E',
//                 color: 'white',
//                 px: 2,
//                 py: 1,
//                 borderRadius: 2,
//                 '&:hover': {
//                   bgcolor: '#1565c0',
//                 },
//               }}
//             >
//               OK
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default OtpInput;



// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Typography, TextField, CircularProgress, Box, Modal, Container } from '@mui/material';
// import { finappaxios } from '../../../../axios';

// const OtpInput = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const emailPayload = localStorage.getItem('email_response');
//   const inputRefs = [useRef(), useRef(), useRef(), useRef()];
//   const [modal, setModal] = useState({ isOpen: false, message: '' });
//   const [resendText, setResendText] = useState('Resend');
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const intervalRef = useRef(null);

//   const handleResendClick = () => {
//     setResendText('30 sec');
//     setResendDisabled(true);
//     let countdown = 30;
//     intervalRef.current = setInterval(() => {
//       if (countdown === 1) {
//         clearInterval(intervalRef.current);
//         setResendText('Resend');
//         setResendDisabled(false);
//       } else {
//         countdown--;
//         setResendText(`${countdown} sec`);
//       }
//     }, 1000);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const enteredOTP = otp.join('');
    
//     try {
//       const response = await finappaxios.post('/api/verify-otp', {
//         otp: enteredOTP,
//         email: emailPayload,
//       });

//       const data = response.data;
//       setLoading(false);
//       if (data.success) {
//         setModal({ isOpen: true, message: 'OTP verified successfully!' });
//         setTimeout(() => {
//           navigate('/reset-password');
//         }, 3000);
//       } else {
//         setModal({ isOpen: true, message: 'Failed to verify OTP. Please try again.' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setLoading(false);
//       setModal({ isOpen: true, message: 'Failed to verify OTP. Please check your network connection and try again.' });
//     }
//   };

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!isNaN(value) && value.length === 1) {
//       let newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       if (value && index < 3) {
//         inputRefs[index + 1].current.focus();
//       }
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       height="100vh"
//       sx={{ bgcolor: '#EEEEEE' }}
//     >
//       <Container
//         maxWidth="xs"
//         sx={{
//           bgcolor: 'white',
//           p: 4,
//           borderRadius: 4,
//           boxShadow: 1,
//           textAlign: 'center',
//           width: '360px',
//           height: '430px',
//         }}
//       >
//         <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Enter verification code</Typography>
//         <Typography variant="body2" sx={{ color: 'text.Primary', mb: 4 }}>
//           We have sent 4 digits of OTP to your<br />registered email address
//         </Typography>
//         <Box component="form" sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 5 }}>
//           {otp.map((value, index) => (
//             <TextField
//               key={index}
//               type="text"
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
//               inputRef={inputRefs[index]}
//               variant="outlined"
//               sx={{ width: '2.7rem', height: '2.5rem', fontSize: '1.25rem' }}
//             />
//           ))}
//         </Box>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           disabled={loading}
//           sx={{
//             width: "210px", // Adjust width as needed
//             marginLeft: '4px',
//             marginBottom: '20px',// Adjust margin left as needed
//             height: '40px', // Adjust height as needed
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Custom box shadow
//             bgcolor: '#1A237E',

//             '&:hover': {
//               bgcolor: "#1565c0", // Darker blue on hover
//             },
//             '&:focus': {
//               bgcolor: "#1976d2", // Blue on focus
//             },
//             '&.Mui-disabled': {
//               bgcolor: "#1976d2", // Blue when disabled
//             },
//           }}
//         >
//           {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
//         </Button>
//         <Typography variant="body2" sx={{ color: 'text.Primary', mb: 2 }}>
//           If you haven't received a code,{' '}
//           <span
//             style={{ cursor: !resendDisabled ? 'pointer' : 'not-allowed', color: resendDisabled ? '#999' : '#d32f2f' }}
//             onClick={!resendDisabled ? handleResendClick : null}
//           >
//             {resendText}
//           </span>
//         </Typography>
//         <Typography variant="body2">
//           <a href="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
//             Sign-up now
//           </a>
//         </Typography>
//       </Container>
//       <Modal open={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })}>
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0, 0, 0, 0.5)' }}
//         >
//           <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
//             <Typography sx={{ mb: 3 }}>{modal.message}</Typography>
//             <Button
//               onClick={() => setModal({ ...modal, isOpen: false })}
//               sx={{
//                 bgcolor: '#1A237E',
//                 color: 'white',
//                 px: 2,
//                 py: 1,
//                 borderRadius: 2,
//                 '&:hover': {
//                   bgcolor: '#1565c0',
//                 },
//               }}
//             >
//               OK
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default OtpInput;



import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, CircularProgress, Box, Modal, Container } from '@mui/material';
import { finappaxios } from '../../../../axios';

const OtpInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailPayload = localStorage.getItem('email_response');
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [modal, setModal] = useState({ isOpen: false, message: '' });
  const [resendText, setResendText] = useState('Resend');
  const [resendDisabled, setResendDisabled] = useState(false);
  const intervalRef = useRef(null);

  const handleResendClick = () => {
    setResendText('30 sec');
    setResendDisabled(true);
    let countdown = 30;
    intervalRef.current = setInterval(() => {
      if (countdown === 1) {
        clearInterval(intervalRef.current);
        setResendText('Resend');
        setResendDisabled(false);
      } else {
        countdown--;
        setResendText(`${countdown} sec`);
      }
    }, 1000);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const enteredOTP = otp.join('');
    
    try {
      const response = await finappaxios.post('/api/verify-otp', {
        otp: enteredOTP,
        email: emailPayload,
      });

      const data = response.data;
      setLoading(false);
      if (data.success) {
        setModal({ isOpen: true, message: 'OTP verified successfully!' });
        setTimeout(() => {
          navigate('/reset-password');
        }, 3000);
      } else {
        setModal({ isOpen: true, message: 'Failed to verify OTP. Please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      setModal({ isOpen: true, message: 'Failed to verify OTP. Please check your network connection and try again.' });
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ bgcolor: '#EEEEEE' }}
    >
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: 'white',
          p: 4,
          borderRadius: 4,
          boxShadow: 1,
          textAlign: 'center',
          width: '360px',
          height: '430px',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Enter verification code</Typography>
        <Typography variant="body2" sx={{ color: 'text.Primary', mb: 4 }}>
          We have sent 4 digits of OTP to your<br />registered email address
        </Typography>
        <Box component="form" sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 5 }}>
          {otp.map((value, index) => (
            <TextField
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
              inputRef={inputRefs[index]}
              variant="outlined"
              sx={{ width: '2.7rem', height: '2.5rem', fontSize: '1.25rem' }}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            width: "220px", // Adjust width as needed
            marginLeft: '4px',
            marginBottom: '20px',// Adjust margin left as needed
            height: '40px', // Adjust height as needed
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Custom box shadow
            bgcolor: '#1A237E',

            '&:hover': {
              bgcolor: "#1565c0", // Darker blue on hover
            },
            '&:focus': {
              bgcolor: "#1976d2", // Blue on focus
            },
            '&.Mui-disabled': {
              bgcolor: "#1976d2", // Blue when disabled
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
        </Button>
        <Typography variant="body2" sx={{ color: 'text.Primary', mb: 2 }}>
          If you haven't received a code,{' '}
          <span
            style={{ cursor: !resendDisabled ? 'pointer' : 'not-allowed', color: resendDisabled ? '#999' : '#d32f2f' }}
            onClick={!resendDisabled ? handleResendClick : null}
          >
            {resendText}
          </span>
        </Typography>
        <Typography variant="body2">
          <a href="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Sign-up now
          </a>
        </Typography>
      </Container>
      <Modal open={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
            <Typography sx={{ mb: 3 }}>{modal.message}</Typography>
            <Button
              onClick={() => setModal({ ...modal, isOpen: false })}
              sx={{
                bgcolor: '#1A237E',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#1565c0',
                },
              }}
            >
              OK
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default OtpInput;
