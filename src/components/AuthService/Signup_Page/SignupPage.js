
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../Auth_Service/AuthService";
import signupImg from '../../../Assets/images/signup_dataworks.jpg';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Container, Typography, TextField, Button, IconButton, CircularProgress } from "@mui/material";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading indicator

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false); // Hide loading indicator
      return;
    }

    try {
      const response = await AuthService.register(username, email, password, confirmPassword);
      console.log('API response:', response);
      if (response.status === 201 || response.status === 200) {
        console.log(response);
        const userResponseId = response.data.id;
        localStorage.setItem('user_id_response', userResponseId);
        setIsRegistered(true);
      } else {
        setError("Failed to register");
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError("Failed to register");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleOk = () => {
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#EEEEEE"
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 4,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Custom box shadow
          width: { xs: '100%', sm: '400px' }, // Responsive width
        }}
      >
        {isRegistered ? (
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="bold" mb={4}>
              Successfully Registered
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOk}>
              OK
            </Button>
          </Box>
        ) : (
          <Box>
            <Box display="flex" justifyContent="center" mb={2}>
              <img src={signupImg} alt="Financial Works Logo" style={{ width: "230px", height: "70px" }} />
            </Box>
            <Typography variant="h6" fontWeight="semibold" textAlign="center" mb={3}>
              Sign Up
            </Typography>
            <form onSubmit={handleRegister}>
              <Box mb={2}>
                <TextField
                  type="text"
                  label="Username"
                  placeholder=" "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    width:"280px",
                    marginLeft: '35px',
                    '& .MuiInputBase-input': {
                      height:'35px',
                      padding: '10px',
                      textAlign: 'left', // Center align placeholder text
                    },
                  }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  type="email"
                  label="Email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    width:"280px",
                    marginLeft: '35px',
                    '& .MuiInputBase-input': {
                      height:'35px',
                      padding: '10px',
                      textAlign: 'left', // Center align placeholder text
                    },
                  }}
                />
              </Box>
              <Box mb={2} position="relative">
                <TextField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    width:"280px",
                    marginLeft: '35px',
                    '& .MuiInputBase-input': {
                      height:'35px',
                      padding: '10px',
                      textAlign: 'left', // Center align placeholder text
                    },
                  }}
                />
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ position: "absolute", right: 45, top: 6 }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </Box>
              <Box mb={2} position="relative">
                <TextField
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    width:"280px",
                    marginLeft: '35px',
                    '& .MuiInputBase-input': {
                      height:'35px',
                      padding: '10px',
                      textAlign: 'left', // Center align placeholder text
                    },
                  }}
                />
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  sx={{ position: "absolute", right: 45, top: 6 }}
                >
                  {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                
                disabled={loading} // Disable button when loading
                sx={{
                  width: "280px", // Adjust width as needed
                  marginLeft: '35px', // Adjust margin left as needed
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
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
              </Button>
              <Typography textAlign="center" mt={2}>
                Have an account?{" "}
                <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Login now
                </Link>
              </Typography>
              {error && (
                <Typography color="error" textAlign="center" mt={2}>
                  {error}
                </Typography>
              )}
            </form>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default SignupPage;
