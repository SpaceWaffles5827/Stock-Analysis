import './DataPoint.css'


function parseData(stockData){
  var curentDay = 0
  var counter = 0
  var newData = []
  var newdays= []
  for(let i = 0; i < stockData.length ;i++){
    if(stockData[i].day!=curentDay){
      if(newData){
        // console.log(newData)
        newdays.push({day: stockData[i].day,data: newData})
      }
      newData = [stockData[i]]
      curentDay=stockData[i].day
    }
    else{
      newData.push(stockData[i])
    }
  }
  console.log(newdays)
}


function DataPoint({stockData}) {
    var curentDay = 0
    var counter = 0
    var newDictonary =[]
    var newDataPointArr = []
    return (
      <div className="DataPoint">
        {/* {stockData.map((dataPoint) => {
          if(curentDay!=dataPoint.day){
            newDataPointArr = [dataPoint]
            // newDictonary.push({date: dataPoint.day, dataPoint})
            curentDay=dataPoint.day
            counter+=1 
            return(
              <>
              <h1 className='newDay'>New Day {counter} Point:</h1>
              <h1>Open:{dataPoint.open} Open:{dataPoint.close} Date: {dataPoint.month}-{dataPoint.day}-{dataPoint.year}</h1>
              </>
            )
          }
          newDataPointArr.push(dataPoint)
          return (
            <>
            <h1>Point:</h1>
            <h1>Open:{dataPoint.open} Open:{dataPoint.close} Date: {dataPoint.month}-{dataPoint.day}-{dataPoint.year}</h1>
            </>
          )
        })}
      {console.log(newDictonary)} */}

      {parseData(stockData)}

      </div>
    );
  }
  
  export default DataPoint;