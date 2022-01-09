import React from 'react';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#37474f',
    },
    secondary: {
      main: '#0097a7',
    },
    error: {
      main: '#e91e63',
    },
    success: {
      main: '#43a047',
    },
  },
  typography: {
    fontFamily: 'Arvo',
  },
});

export default function ThemeConfig() {
  return <div />;
}
