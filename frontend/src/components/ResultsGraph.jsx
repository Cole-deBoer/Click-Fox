import React from "react";
import { Line } from "react-chartjs-2"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ResultsGraph = ({testDuration = 0.1, clickArray = []}) => {
    const data = {
        labels: getLengthOfTest(testDuration),
        datasets: [
            {
                data: clickArray,
                fill: false,
                tension: 0.4,
            }
        ],
    };
    
    const options = {
        plugins: {
           legend: {
                display: false,
           }
        },
        scales: {
            x: {
                min: 0
            },
            y: {
                title: {
                    display: true,
                    text: 'Clicks Per Second'
                },
                min: 0
            }
        },
        responsive: true,
        borderColor: 'rgb(245,245,245)',
        backgroundColor: 'rgb(245,245,245)',
        maintainAspectRatio: false,
    };

    options.animation = false;
    return <Line data={data} options={options}/>
}


// returns an array of whole digits between 0 and the passed number.
// ex. input => 5.55 output => [1, 2, 3, 4, 5, 5.5] 
const getLengthOfTest = (testLength = 0.1) => {
    let timesArray = [];
    let wholeNumber = 0;
    while (wholeNumber < testLength) {
        timesArray.push(wholeNumber)
        wholeNumber++;
        if(wholeNumber >= testLength) {
            timesArray.push(testLength);
            return timesArray;
        } 
    }
}

export default ResultsGraph;