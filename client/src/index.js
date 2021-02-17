import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App.js';
import './index.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  

const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#fff',
        main: 'rgb(23, 105, 170)',
        dark: '#000'
     },
     secondary: {
       main: '#932432',
     },
  },
  typography: { 
     useNextVariants: true,
     fontFamily: [
      'Quicksand',
      '"Fira Sans"', 
      '"Oleo Script Swash Caps"',
      'Ubuntu',  
      '-apple-system', 
      'BlinkMacSystemFont', 
      '"Segoe UI"', 
      'Roboto', 
      'Oxygen',
      'Cantarell', 
      'Droid Sans', 
      'Helvetica Neue',
    ].join(','),
    subtitle1: {
      "fontWeight": 600,
    },
    body1: {
      "fontWeight": 600,
    },
    subtitle2: {
      "fontWeight": 500,
    },
    body2: {
      "fontWeight": 500,
    },
  }
});


ReactDOM.render(
  <React.StrictMode>
  <MuiThemeProvider theme = { theme }>
    <App />
  </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
