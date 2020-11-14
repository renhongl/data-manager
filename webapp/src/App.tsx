import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import { HashRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/" exact component={HomePage}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
