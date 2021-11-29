import React, {useState, useEffect} from "react";
import './App.css';
import UserSleepDisplay from './components/UserSleepDisplay';
import logo  from './eightSleep.png';
import axios from 'axios';


const App = () => {
  const [mounted, setMounted] = useState(false)
  const [data,setData] = useState([]);

  useEffect(() =>{
    const fetchData = async() => {
      try {
        const url = '/fetch-data';
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
          console.log(error);
      }
    }
    fetchData()
    setMounted(true)
  },[])
  return (
      <div style={{
        justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <div className="App-logo">
          <img src={logo} alt="logo" />
        </div>
        <UserSleepDisplay data={data} />
      </div>
    );
  }

export default App;
