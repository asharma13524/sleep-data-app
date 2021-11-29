import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import BarChart from './BarChart';
import LineChart from './LineChart';
import '../App.css';


const UserSelection = ({ data }) => {
  const options = ['User 1', 'User 2', 'User 3'];
  const[userSelected, setUserSelected] = useState('Please Select a Sleep User')

  return (
    <div style={{
        margin: 'auto', width: '90%', paddingBottom:'10rem'}}>
      <Dropdown
        options={options} value={userSelected}
        onChange={(e) => setUserSelected(e.value)}/>
      {userSelected !== 'Please Select a Sleep User' ? (
        <React.Fragment key={userSelected}>
          <BarChart userSelected={userSelected} sleepData={data} />
          <LineChart userSelected={userSelected}
          sleepData={data} />
        </React.Fragment>
        ) : (
          <div></div>
        )
      }

    </div>
  )
}

export default UserSelection;
