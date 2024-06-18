
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, Box, Container, CircularProgress } from '@mui/material';
import { finappaxios } from '../../axios';

function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Show loading indicator

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      setLoading(true); // Hide loading indicator
      return;
    }

    const email = localStorage.getItem('email_response');

    try {
      const response = await finappaxios.post('/api/reset-password', {
        email,
        newPassword,
        confirmPassword,
      });

      if (response.status === 200) {
        navigate('/login'); // Redirect to login page after successful password reset
      } else {
        const errorData = response.data;
        console.error('Server responded with an error:', errorData);
        setError(errorData.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
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
      sx={{ bgcolor: '#EEEEEE' }}
    >
      <Container maxWidth="sm">
        <Box
        marginLeft="90px"
          p={4}
          bgcolor="white"
          boxShadow={2}
          borderRadius={4}
          textAlign="center"
          sx={{ width: '65%', height: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Typography variant="h5" mb={4} mt={5}>
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              variant="outlined"
              required
              sx={{
                mb: 2,
                height: '50px',
                width: '85%',
                '& input': { height: '40px', padding: '6px 14px' },
              }}
            />
            <TextField
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              variant="outlined"
              required
              sx={{
                mb: 2,
                height: '50px',
                width: '85%',
                '& input': { height: '40px', padding: '6px 14px' },
              }}
            /><Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{
                marginTop: 2,
                height: '50px',
                width: '85%',
                padding: '10px 0',
                bgcolor: '#1A237E', // Blue color
                '&:hover': {
                  bgcolor: '#2a3eb1', // Darker blue on hover
                },
                '&.Mui-disabled': {
                  bgcolor: '#3f51b5', // Blue when disabled
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
            </Button>

          </form>
          {error && (
            <Typography variant="body2" color="error" mt={2}>
              {error}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default ResetPassword;
