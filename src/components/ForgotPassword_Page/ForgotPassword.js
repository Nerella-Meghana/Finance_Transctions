
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { finappaxios } from '../../axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Show loading indicator

    try {
      const response = await finappaxios.post('/api/forgot-password', { email });

      if (response.status === 200) {
        const data = response.data;
        console.log('Response data:', data);
        localStorage.setItem('email_response', data.email);
        navigate('/verification', { state: { email } });
      } else {
        const errorData = response.data;
        console.error('Server responded with an error:', errorData); // Log the error response
        setError(errorData.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error sending forgot password request:', error); // Log the fetch error
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#EEEEEE" // Set background color to #EEEEEE
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            bgcolor: "white",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            boxShadow: 2,
            borderRadius: 2,
            width: '370px', // Adjust width as needed
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2, marginTop: 6 }}>
            Forgot your password
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              type="email"
              label="Email"
              placeholder=" "
              value={email}
              onChange={handleInputChange}
              required
              fullWidth
              variant="outlined"
              sx={{
                width: "280px",
                marginLeft: '22px',
                marginTop: '14px',
                '& .MuiInputBase-input': {
                  height: '35px',
                  padding: '10px',
                  textAlign: 'left', // Center align placeholder text
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              bgcolor='#1A237E'
              fullWidth
              sx={{
                width: "280px", // Adjust width as needed
                marginLeft: '22px', // Adjust margin left as needed
                height: '40px', // Adjust height as needed
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Custom box shadow
                bgcolor: '#1A237E',
                marginTop: '20px',

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
              {loading ? <CircularProgress size={24} color="inherit" /> : "Continue"}
            </Button>
          </form>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Typography variant="body2" sx={{ mt: 2, mb: 7, fontSize: 16 }}>
            Remember your password?{' '}
            <Link to="/login" style={{ color: 'blue', marginLeft: '4px' }}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
