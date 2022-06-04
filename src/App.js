import "./app.css"
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import DataPoint from "./DataPoint";
import TestChart from "./TestChart";



function App() {
  const [stockData,setStockData] = useState([{}])

  useEffect(() => {
    getData()
  }, []);

  function getData(){
    var newDictonary = []
    var newStockData = []
    var newStockData
    (axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=demo')
    .then(function (response) {
    var dataString = response.data
    var row = dataString.split(/\r?\n/);
    row.map((info) => newStockData.push(info.split(',')))
    newStockData.shift()
    newStockData.pop()

    newStockData.map((info)=> {
      info [0] = info[0].replace(' ','-')
      info[0] = info[0].split('-')
      newDictonary.push({
        year: info[0][0],
        month: info[0][1],
        day: info[0][2],
        time: info[0][3],
        open: info[1],
        high: info[2],
        low: info[3],
        close: info[4],
        volume: info[5]})
    })
    newDictonary.reverse()
    setStockData(newDictonary)
  }))
  }



  return (
    <div className="App">
      <DataPoint stockData={stockData}></DataPoint>
    </div>
  );
}

export default App;
