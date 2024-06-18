
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../Auth_Service/AuthService";
import loginImg from "../../../Assets/images/login dataworks.jpg";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Container, Typography, TextField, Button, IconButton, CircularProgress } from "@mui/material";


function LoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading indicator
    try {
      const data = await AuthService.login(userName, password);
      console.log(data.token);
      if (data.token) {
        AuthService.setToken(data.token);
      localStorage.setItem('username', userName);
        setSuccessMessage("Successfully logged in!");
        setTimeout(() => navigate("/home"), 1000); // Redirect after 1 second
      } else {
        setError("Login failed");
      }
    } catch (error) {
      setError("Check your credentials and try again");
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
      bgcolor="#EEEEEE"
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "white",
          p: 4,
          width:" 370px ",
          borderRadius: 4,
          boxShadow: 1,
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={loginImg}
            alt="Financial Works Logo"
            style={{ width: "230px", height: "70px" }}
          />
        </Box>
        <Typography variant="h6" fontWeight="semibold" textAlign="center" mb={3}>
          Log in
        </Typography>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              type="text"
              label="Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{
                width: '280px',
                marginLeft: '22px',
                '& .MuiInputBase-input': {
                  height: '35px',
                  padding: '10px', // Adjust padding as needed
                  display: 'flex',
                  alignItems: 'right'
                },
              }}
            />
          </Box>
          <Box mb={1} position="relative">
            <TextField
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{
                width: '280px',
                marginLeft: '22px',
                '& .MuiInputBase-input': {
                  height: '35px',
                  padding: '10px', // Adjust padding as needed
                  display: 'flex',
                  alignItems: 'center'
                },
              }}
            />
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              sx={{ position: "absolute", right: 25, top: 8 }}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Box>  
          <Box display="flex" justifyContent="space-between" mb={1} paddingLeft={3} paddingTop={2}>
            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
              <Typography color="primary" marginTop={-2} marginBottom={4}>Forgot Password?</Typography>
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            bgcolor= '#1A237E'
            fullWidth
            sx={{
              width: "280px", // Adjust width as needed
              marginLeft: '22px', // Adjust margin left as needed
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
            disabled={loading} // Disable button when loading
          >
            {loading ? <CircularProgress size={24} color="inherit"/> : "Log in"}
          </Button>
          {successMessage && (
            <Typography style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>
              {successMessage}
            </Typography>
          )}
          <Typography textAlign="center" marginTop={1}>
            Not a member?{" "}
            <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Sign-up now
            </Link>
          </Typography>
          {error && (
            <Typography color="error" textAlign="center" mt={2}>
              {error}
            </Typography>
          )}
        </form>
      </Container>
    </Box>
  );
}

export default LoginPage;
