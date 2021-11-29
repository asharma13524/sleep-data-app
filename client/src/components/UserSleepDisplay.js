import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import BarChart from './BarChart';
import LineChart from './LineChart';
import '../App.css';


const UserSelection = () => {
  const options = ['User 1', 'User 2', 'User 3'];
  const [userSleepData, setUserSleepData] = useState({
    userSelected: 'Please Select a Sleep User',
    sleepData: []
  });
  const { sleepData, userSelected } = userSleepData;

  const handleUserChange = async (e) => {
    try {
      const url = '/fetch-data';
      const res = await axios.get(url);
      setUserSleepData({
        userSelected: e.value,
        sleepData: res.data
      })
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <div style={{
        margin: 'auto', width: '90%', paddingBottom:'10rem'}}>
      <Dropdown
        options={options} value={userSelected}
        onChange={(e) => handleUserChange(e)}/>
      {userSelected !== 'Please Select a Sleep User' ? (
        <React.Fragment key={userSelected}>
          <BarChart userSelected={userSelected} sleepData={sleepData} />
          <LineChart userSelected={userSelected}
          sleepData={sleepData} />
        </React.Fragment>
        ) : (
          <div></div>
        )
      }

    </div>
  )
}

export default UserSelection;
