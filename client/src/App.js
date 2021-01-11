import './App.css';
import React, {useState, useEffect} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { LoginContext } from "./context/LoginContext";
import styled from "styled-components";
import image from "./assets/SickLines.svg"

import Header from "./components/Header"

import Home from "./views/Home";
import GamePage from './views/GamePage';
import Registrer from './views/Registrer';
import Login from './views/Login';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: -1;
  .flip{
    transform: rotateY(180deg)
  }
`

export default function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if(!user){
      let found = JSON.parse(localStorage.getItem("user"));
      setUser(found);
    }
  }, [user])

  return (
      <div className="App">
        <LoginContext.Provider value={{user, setUser}}>
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/gamepage/:id" component={GamePage} />
              <Route path="/registrer" component={Registrer} />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
        </LoginContext.Provider>
        <Wrapper>
          <img src={image} alt="laserbeams"/>
          <img className="flip" src={image} alt="laserbeams"/>
        </Wrapper>
      </div>
  );
}



