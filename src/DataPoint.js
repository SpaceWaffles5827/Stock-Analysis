import './DataPoint.css'

function DataPoint({stockData}) {
    var curentDay = 0
    var counter = 0
    return (
      <div className="DataPoint">
        {stockData.map((dataPoint) => {
          if(curentDay!=dataPoint.day){
            console.log('new day')
            curentDay=dataPoint.day
            counter+=1 
            return(
              <>
              <h1 className='newDay'>New Day Point:</h1>
              <h1>Day Count {counter}</h1>
              <h1>Open:{dataPoint.open} Open:{dataPoint.close} Date: {dataPoint.month}-{dataPoint.day}-{dataPoint.year}</h1>
              </>
            )
          }
          return (
            <>
            <h1>Point:</h1>
            <h1>Day Count {counter}</h1>
            <h1>Open:{dataPoint.open} Open:{dataPoint.close} Date: {dataPoint.month}-{dataPoint.day}-{dataPoint.year}</h1>
            </>
          )
        })}
      </div>
    );
  }
  
  export default DataPoint;