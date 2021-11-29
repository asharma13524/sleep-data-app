import React, { useState } from 'react';
import ReactFrappeChart from 'react-frappe-charts';
import { getSleepBarChartData } from '../utils/helperFunctions';
import '../App.css';


const MyChart = ({ userSelected, sleepData }) => {
  const [timePerSleepCycleData, dates, sleepScores] = getSleepBarChartData(userSelected, sleepData);
  const [chartRequest, setChartRequest] = useState({
    chartData: timePerSleepCycleData,
    dateTimes: dates,
    userSleepScores: sleepScores
  });
  const { chartData, dateTimes, userSleepScores } = chartRequest;

  return (
    <div className="allBars">
      {chartData.map((sleepInterval, index) => {
        const sleepIntervalId = Object.keys(sleepInterval)[0];
        const title = 'Time Per Sleep Cycle (mins)'
        return (
          <React.Fragment key={sleepIntervalId}>
            <div className="chart">
              <div className="sleepscore">
              <span className="date">{dateTimes[index]}</span>
              <br></br>
              Sleep Score: {userSleepScores[index]}
              </div>
              <ReactFrappeChart key={sleepIntervalId}
                title={title}
                type="donut"
                colors={['#21ba45', '#20c4f4', '#fb0a66', '#8191dd']}
                axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
                height={250}
                data={{
                  labels: Object.keys(sleepInterval[sleepIntervalId]),
                  datasets: [{ values: Object.values(sleepInterval[sleepIntervalId]) }],
                }}
                />
            </div>
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default MyChart;