import React, { useState } from 'react';
import ReactFrappeChart from 'react-frappe-charts';
import { getSleepLineChartData } from '../utils/helperFunctions';


const LineChart = ({ userSelected, sleepData}) => {
  const chartData = getSleepLineChartData(userSelected, sleepData);
  const [lineChartData, setLineChartData] = useState(chartData);

return (
  <div className="allLines">
      {lineChartData.map((breathMetrics, index) => {
        const sleepIntervalId = Object.keys(breathMetrics)[0];
        const hrValues = breathMetrics[sleepIntervalId]['heartRate']['values']
        const hrDates = breathMetrics[sleepIntervalId]['heartRate']['dateTime']
        const respValues = breathMetrics[sleepIntervalId]['respRate']['values']
        const title = 'HR + Respiratory Rate'
        return (
          <React.Fragment key={sleepIntervalId}>
            <ReactFrappeChart class="lineChart" key={sleepIntervalId}
              title={title}
              type="line"
              colors={["#f70010", "#ff66df"]}
              axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
              height={250}
              data={{
                  labels: hrDates,
                  datasets: [
                    {
                      name: 'HR (bpm)',
                      values: hrValues,
                      labels: hrDates
                    },
                    {
                      name: 'Resp Rate (bpm)',
                      values: respValues,
                      labels: hrValues
                    }
                  ]
              }}
              />
          </React.Fragment>
        )
      })}
    </div>
)
}

export default LineChart;
