import React from "react";
import './App.css';
import UserSleepDisplay from './components/UserSleepDisplay';
import logo  from './eightSleep.png';


const App = () => {
  return (
      <div style={{
        justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <div className="App-logo">
          <img src={logo} alt="logo" />
        </div>
        <UserSleepDisplay />
      </div>
    );
  }


export default App;
