import "./app.css"
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import DataPoint from "./DataPoint";
import TestChart from "./TestChart";



const d = new Date();

function App() {
  const [rawStockData,setRawStockData] = useState([{}])
  const [stockData,setStockData] = useState([{}])
  const [openStockMarketData,setOpenMarketStockData] = useState([{}])

  useEffect(() => {
    setRawData()
  }, []);

  useEffect(() => {
    setFormatedDataAll()
    setFormatedDataOpenHours()
  }, [rawStockData]);


  function setFormatedDataOpenHours(){
    if(rawStockData.length>1){
      var marketOpen = new Date();
      var marketClose = new Date();

      var increament = 1 

      var newArr
      var finalArr = [{}]
      for(var i = 1; i<rawStockData.length; i++){
        var previousDay = rawStockData[i-1].time.split(' ')[0].split('-')[2]
        var day = rawStockData[i].time.split(' ')[0].split('-')[2]
        var month = rawStockData[i].time.split(' ')[0].split('-')[1]
        var year = rawStockData[i].time.split(' ')[0].split('-')[0]
        var hour = (rawStockData[i].time.split(' ')[1].split(':')[0])
        var min = (rawStockData[i].time.split(' ')[1].split(':')[1])
        var sec = (rawStockData[i].time.split(' ')[1].split(':')[2])
        var d = new Date(year, month-1, day, hour, min);

        marketOpen.setHours(9,29,0); //9:30 am
        marketClose.setHours(16,0,0); //4:00 pm

        marketOpen.setMonth(month-1)
        marketOpen.setFullYear(year)
        marketOpen.setDate(day)
        
        marketClose.setMonth(month-1)
        marketClose.setFullYear(year)
        marketClose.setDate(day)
        

        if(previousDay!=day || i<=increament || i+1 == rawStockData.length){   
          if(newArr!=undefined){
            newArr.shift()
            finalArr.push({time: {month: parseInt(month), day: parseInt(previousDay)}, data: newArr})
          }
          newArr=[rawStockData[i]]
        }
        else{
          if(!isAfterHours(d,marketOpen,marketClose)){
            newArr.push(rawStockData[i])
          }
        }
      }
      finalArr.shift()
      console.log(finalArr)
      // setOpenMarketStockData(finalArr)
    }
  }

  function setFormatedDataAll(){
    if(rawStockData.length>1){
      var newArr
      var finalArr = [{}]
      for(var i = 1; i<rawStockData.length; i++){
        var previousDay = rawStockData[i-1].time.split(' ')[0].split('-')[2]
        var day = rawStockData[i].time.split(' ')[0].split('-')[2]
        var month = rawStockData[i].time.split(' ')[0].split('-')[1]
        var year = rawStockData[i].time.split(' ')[0].split('-')[0]
        var hour = (rawStockData[i].time.split(' ')[1].split(':')[0])
        var min = (rawStockData[i].time.split(' ')[1].split(':')[1])
        var sec = (rawStockData[i].time.split(' ')[1].split(':')[2])
        var d = new Date(year, month-1, day, hour, min);
        // marketOpen.setMonth(month-1)
        // marketOpen.setFullYear(year)
        // marketOpen.setDate(day)
        if(previousDay!=day || i<=1 || i+1 == rawStockData.length){   
          if(newArr!=undefined){
            finalArr.push({time: {month: parseInt(month), day: parseInt(previousDay)}, data: newArr})
        }     
          newArr=[rawStockData[i]]  
        }
        else{
          newArr.push(rawStockData[i])
        }
      }
      finalArr.shift()
      setStockData(finalArr)
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


  function isAfterHours(time,marketOpen,marketClose){
    if(time>=marketOpen && time <=marketClose){
      return false
    }
    else{
      return true
    }
  }


  return (
    <div className="App">
      {/* {console.log(stockData)} */}
      {/* {console.log(rawStockData)} */}
    </div>
  );
}

export default App;
