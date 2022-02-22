import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

//----material ui properties----
const useStyles = makeStyles({
  
    nav: {       
        background: '#000',
        alignItems: 'center', 
    },
  title: {
      fontWeight: 700,
      fontSize: "1.7rem",
      marginBottom:"5rem"
      
  }
});


//Header reusable component
const Header = (props) => {
    const classes = useStyles(props);

    return (
        <div>
           <AppBar className={classes.nav}>
                <Toolbar>
                <Typography variant="h6" component="div" >
                  <Link to="/">Dashboard</Link>
                </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <Typography variant="h1" my={5} className={classes.title}>Dashboard</Typography>
        </div>
    )
}

export default Header;