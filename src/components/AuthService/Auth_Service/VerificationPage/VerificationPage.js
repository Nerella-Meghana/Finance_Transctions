
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
