import "./app.css"
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import DataPoint from "./DataPoint";
import TestChart from "./TestChart";

var marketOpen = new Date();
marketOpen.setHours(9,30,0); //9:30 am

var marketClose = new Date();
marketClose.setHours(16,0,0); //4:00 pm

function App() {
  const [rawStockData,setRawStockData] = useState([{}])
  const [stockData,setStockData] = useState([{}])
  const [openStockMarketData,setOpenMarketStockData] = useState([{}])

  useEffect(() => {
    setRawData()
  }, []);

  useEffect(() => {
    setFormatedDataAll()
    
  }, [rawStockData]);

  function setFormatedDataAll(){
    if(rawStockData.length>1){
      var curentDay = 0
      var dayDataPointsArr
      var dayDataPointsArrArr = []
      for(let i = 0; i < rawStockData.length; i++){
        if(i>1){
          var prePoint = (rawStockData[i-1])
          var yesterdayYear = (prePoint.time.split(' ')[0].split('-')[0])
          var yesterdayMonth = (prePoint.time.split(' ')[0].split('-')[1])
          var yesterdayday = (prePoint.time.split(' ')[0].split('-')[2])
          
          var curentPoint = (rawStockData[i])
          var todayYear = (curentPoint.time.split(' ')[0].split('-')[0])
          var todayMonth = (curentPoint.time.split(' ')[0].split('-')[1])
          var todayday = (curentPoint.time.split(' ')[0].split('-')[2])

          if(curentDay!=todayday){
            curentDay=todayday
            dayDataPointsArrArr.push(dayDataPointsArr)
            dayDataPointsArr = [curentPoint]
            // dayDataPointsArr=(daydataPoint)
            
          } 
          else{
            dayDataPointsArr.push(curentPoint)
          }
        }
      }
      console.log(dayDataPointsArrArr)
    }
    

    

      
  }

  function setRawData(){
    (axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=demo')
    .then(function (response) {
      var dataRows = response.data.split(/\r?\n/);
      var dataRowArr = []
      dataRows.map((dataRow)=> { 
          dataRow = dataRow.split(',')
          if(dataRow[4]>=0){
          dataRowArr.push({
            time: dataRow[0],
            open: dataRow[1],
            high: dataRow[2],
            low: dataRow[3],
            close: dataRow[4],
            volume: dataRow[5]})
        }
      })
      setRawStockData(dataRowArr)
  }))
  }


  function getPercentDayGain(index){
    if(stockData[index].data!=undefined){
      for(var i = 0; stockData[index].data.length > i; i++){
        console.log(stockData[index].data[i].time.hour + " : " + stockData[index].data[i].time.min  +" : " + stockData[index].data[i].time.sec )  
      }
    }
  }


  function isAfterHours(time){
    if(time>=marketOpen && time <=marketClose){
      return false
    }
    else{
      return true
    }
  }


  return (
    <div className="App">
      {/* {console.log(rawStockData)} */}
    </div>
  );
}

export default App;
