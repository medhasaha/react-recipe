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
     useNextVariants: true
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
