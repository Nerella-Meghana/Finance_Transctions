

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
