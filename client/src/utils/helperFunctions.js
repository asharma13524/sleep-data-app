import moment from 'moment';


export const convertDateTime = (date) => {
  const dateString = moment(date).format('MM/DD/YYYY');
  return dateString;
}

export const getSleepBarChartData = ( userSelected, data ) => {
  // return {id: {'awake': 10, ...}}
  // grab index of current user
  const currentUserIndex = parseInt(userSelected.slice(-1)) -1;
  const currentUserData = data[currentUserIndex]
  const currentUserIntervals = currentUserData["intervals"]
  const timePerSleepCycle = [];
  const dateTimes = [];
  const sleepScores = [];

  for(let i=0; i<currentUserIntervals.length; i++){
    const dateTime = currentUserIntervals[i]["ts"]
    // convert datetimes into dd/mm/yyyy && push
    dateTimes.push(convertDateTime(dateTime))
    const currentSleepScore = currentUserIntervals[i]["score"]
    sleepScores.push(currentSleepScore);
    const intervalId = currentUserIntervals[i]["id"];
    timePerSleepCycle.push({[intervalId]: {}});
    const stages = currentUserIntervals[i]["stages"];
    const sleepInterval = timePerSleepCycle[i][intervalId];
    for(let sleepStage of stages){
      const stageType = sleepStage["stage"];
      // convert to mins
      const stageDuration = sleepStage["duration"] / 60
      // if stageType not in hashmap, add ita
      if (!(stageType in sleepInterval)){
        sleepInterval[stageType] = stageDuration;
      // increment stageType Time
      } else {
        sleepInterval[stageType] += stageDuration;
      }
    }
  }
  return [timePerSleepCycle, dateTimes, sleepScores];
}

export const getSleepLineChartData = ( userSelected, data ) => {
  // return in format {id: {hR: {dateTime:[], values: []}},
  // {respRate:{dateTime:[], values[]}}}

  const currentUserIndex = parseInt(userSelected.slice(-1)) -1;
  const currentUserData = data[currentUserIndex]
  const currentUserIntervals = currentUserData["intervals"]
  const all_data = [];

  for(let i=0; i<currentUserIntervals.length; i++){
    const intervalId = currentUserIntervals[i]["id"];
    all_data.push({[intervalId]: {}});
    const userResps = currentUserIntervals[i]["timeseries"]["respiratoryRate"];
    const userHeartRates = currentUserIntervals[i]["timeseries"]["heartRate"]
    for(let [dt,resp]  of userResps){
      if (!('respRate' in all_data[i][intervalId])){
        all_data[i][intervalId]['respRate'] = {'dateTime': [((moment(dt).hour() + 11) % 12 + 1) + 'AM'], 'values': [Math.round(resp)]}
      } else {
        all_data[i][intervalId]['respRate']['dateTime'].push(((moment(dt).hour() + 11) % 12 + 1) + 'AM')
        all_data[i][intervalId]['respRate']['values'].push(Math.round(resp))
      }
    }
    for(let [dt, hr] of userHeartRates){
      if (!('heartRate' in all_data[i][intervalId])){
        all_data[i][intervalId]['heartRate'] = {'dateTime': [((moment(dt).hour() + 11) % 12 + 1) + 'AM'], 'values': [Math.round(hr)]}
      } else {
          all_data[i][intervalId]['heartRate']['dateTime'].push(((moment(dt).hour() + 11) % 12 + 1) + 'AM')
          all_data[i][intervalId]['heartRate']['values'].push(Math.round(hr))
      }
    }
  }
  return all_data
}


export default { getSleepBarChartData, getSleepLineChartData, convertDateTime };