import logo from './logo.svg';
import './App.css';
import  Application from './components/Application';
import Admin from "./components/Admin";
import Login from "./components/Login";
import ApplicationsHandler from "./components/ApplicationsHandler";
import React, { useState } from "react";
import UsersHandler from './components/UserHandler';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import { Link } from "react-router-dom";
import MainPage from './components/MainPage';

function App() {

  return (
    <div className="App">
      <MainPage/>
    </div>
  );
}

export default App;
