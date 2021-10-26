import './App.css';
import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './pages/authorization/sign-in/signin.component';
import SignUp from './pages/authorization/sign-up/signup.component';

function App() {

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
