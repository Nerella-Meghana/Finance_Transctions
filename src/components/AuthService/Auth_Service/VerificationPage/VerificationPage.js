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







import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, Link, Box } from '@mui/material';
import Modal from '@mui/material/Modal';

const OtpInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();
  const emailPayload = localStorage.getItem('email_response');
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [modal, setModal] = useState({ isOpen: false, message: '' });
  const [resendButton, setResendButton] = useState('Resend');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const intervalRef = useRef(null);

  const handleResendClick = () => {
    setResendButton('Sent');
    setResendDisabled(true);
    setCountdown(30);
    intervalRef.current = setInterval(() => {
      setCountdown(prevCount => prevCount - 1);
    }, 1000);
  };

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(intervalRef.current);
      setResendButton('Resend');
      setResendDisabled(false);
    } else {
      setResendButton(`Sent ${countdown}`);
    }
  }, [countdown]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);  // Cleanup on component unmount
  }, []);

  const handleSubmit = () => {
    const enteredOTP = otp.join('');
    fetch('/api/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp: enteredOTP, email: emailPayload }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setModal({ isOpen: true, message: 'OTP verified successfully!' });
        setTimeout(() => {
          navigate('/reset-password'); // Navigate after closing the modal
        }, 3000);
      } else {
        setModal({ isOpen: true, message: 'Failed to verify OTP. Please try again.' });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setModal({ isOpen: true, message: 'Failed to verify OTP. Please check your network connection and try again.' });
    });
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Move focus to the next input automatically
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs[index - 1].current.focus();
      } else {
        let newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const modalCloseHandler = () => {
    setModal({ isOpen: false, message: '' });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.default">
      <Box p={4} bgcolor="white" boxShadow={2} borderRadius={4} textAlign="center" style={{ width: '360px', height: '430px' }}>
        <Typography variant="h5" marginTop={2} gutterBottom>
          Enter verification code
        </Typography>
        <Typography variant="body1" color="textSecondary" marginTop={4} gutterBottom>
          We have sent 4 digits of OTP to your registered email address
        </Typography>
        <Box display="flex" justifyContent="center" marginBottom={6} marginTop={2}>
          {otp.map((value, index) => (
            <TextField
              key={index}
              type="text"
              variant="outlined"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputProps={{ maxLength: 1 }}
              inputRef={inputRefs[index]}
              className="otp-input"
              style={{ width: 45, height: 30, margin: '10px 5px', textAlign: 'center' }}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ width: 200, height: 40, marginBottom: 20 }}
        >
          Continue
        </Button>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          If you haven't received a code,{' '}
          <span
            className={`text-blue-500 cursor-pointer hover:underline ${resendDisabled ? 'cursor-not-allowed text-gray-400' : ''}`}
            onClick={!resendDisabled && handleResendClick}
          >
            {resendButton}
          </span>
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Link href="/signup" className="text-blue-500 cursor-pointer hover:underline">
            Sign-up now
          </Link>
        </Typography>
      </Box>
      <Modal open={modal.isOpen} onClose={modalCloseHandler}>
        <Box p={4} bgcolor="white" boxShadow={4} borderRadius={8} textAlign="center" style={{ width: '300px', margin: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            {modal.message}
          </Typography>
          <Button variant="contained" color="primary" onClick={modalCloseHandler} style={{ marginTop: 20 }}>
            OK
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default OtpInput;














