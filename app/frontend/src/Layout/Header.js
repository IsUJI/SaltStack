import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';


  
export default () =>
  <AppBar position="static" style={{marginBottom: '40px'}}>
    <Toolbar>
    {/* <IconButton edge="start" color="inherit" aria-label="icono">
      <img src="https://media-exp1.licdn.com/dms/image/C4E0BAQGsUd9cPk-rjw/company-logo_200_200/0/1569010190262?e=2159024400&v=beta&t=tW0paXkYD5OhdVDgnfwH33rUGKIPv1ja7O55va1VxRo" alt="Logo"/>
    </IconButton> */}
      <h1>I-care Reliability</h1>
    </Toolbar>
  </AppBar>