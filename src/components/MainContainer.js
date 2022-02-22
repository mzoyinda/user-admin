import * as React from 'react';
import { Button,Card,CardContent,Divider,Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import {useHistory } from 'react-router-dom';


//----material ui properties----
const theme = createTheme({
    typography: {
      button: {
        textTransform: "none"
        }
    
    },
 
  });



//mainContainer reusable component
const MainContainer = ({ children, title, action, className }) => {
  
  let history = useHistory();

  return (
      <ThemeProvider theme={theme} >
      <Card variant="outlined">
      <Box
          sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', justifyContent: 'space-between' }
          }
          m={1}
      >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
                  <Button onClick={() => history.push("/add-user")} variant="contained" className={className}>{action}</Button> 
        </Box>
        <Divider/>
              <CardContent>
                  {children}
        </CardContent>
        </Card>
    </ThemeProvider >
   
    )
}

export default MainContainer;