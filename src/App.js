import { Container } from '@mui/material';
import { Switch, Route } from "react-router-dom";
import React from 'react'
import Header from './components/Header';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="App" >
      <Container maxWidth="lg" >
        <Header/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/add-user" component={AddUser} />
          <Route path="/edit-user/:id" component={EditUser} />
      </Switch>
      </Container>
    </div>
  );
}

export default App;
