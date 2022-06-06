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
  const [stockData,setStockData] = useState([{}])
  const [openStockMarketData,setOpenMarketStockData] = useState([{}])

  useEffect(() => {
    getData()
  }, []);

  function getData(){
    var time123 = new Date();
    var newDictonary = []
    var newStockData = []
    var newStockData
    var timeArr 
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
      timeArr = (info[0][3].split(':'))
      time123.setHours(timeArr[0],timeArr[1],timeArr[2])
      newDictonary.push({
        time: {hour:timeArr[0], min:timeArr[1], sec:timeArr[2]},
        year: info[0][0],
        month: info[0][1],
        day: info[0][2],
        open: info[1],
        high: info[2],
        low: info[3],
        close: info[4],
        volume: info[5],
        afterHours: isAfterHours(time123),
      })
    })

    ///////////////////////// New New ///////////////////////

    var DatArray = [[{day: 0}]]
    var newData = []

    for(var i = 0; newDictonary.length > i; i++){
      if(DatArray[0].day!=newDictonary[i].day){
        DatArray = [newDictonary[i]]
        newData.push({date: {month: newDictonary[i].month, day: newDictonary[i].day}, data: DatArray})
      }
      else{
        DatArray.push(newDictonary[i])
      }
    }
    newData.pop()
    setStockData(newData)

    var NewNewDic = []

    for(var i = 0; i < newData.length; i++){
      for(var x = 0; x < newData[i].data.length; x++){
        if(newData[i].data[x].afterHours==false){
          NewNewDic.push(newData[i].data[x])
        }
      }
    }

    // console.log(NewNewDic)

    DatArray = [[{day: 0}]]
    newData = []

    for(var i = 0; NewNewDic.length > i; i++){
      if(DatArray[0].day!=NewNewDic[i].day){
        console.log(DatArray)
        DatArray = [NewNewDic[i]]
      }
      else{
        DatArray.push(NewNewDic[i])
      }
    }

    // console.log(DatArray)

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
      {/* <DataPoint stockData={stockData}></DataPoint> */}
      {/* {console.log(getPercentDayGain(0))} */}
      {/* {console.log(stockData)} */}
      {/* {console.log(openStockMarketData)} */}
    </div>
  );
}

export default App;
