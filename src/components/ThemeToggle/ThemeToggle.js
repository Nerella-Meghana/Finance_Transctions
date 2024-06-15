// import React from 'react';
// import { useTheme } from '../../contexts/ThemeContext';

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <button className="focus:outline-none" onClick={toggleTheme}>
//       {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
//     </button>
//   );
// };

// export default ThemeToggle;



// themes.js

import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3990FF',
      dark: '#02367D',
    },
    text: {
      primary: '#111111',
    },
    // other theme options
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#265D97',
      dark: '#132F4C',
    },
    text: {
      primary: '#ffffff',
    },
    // other theme options
  },
});
