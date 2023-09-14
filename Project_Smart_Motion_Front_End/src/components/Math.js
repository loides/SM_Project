
function calculateSensorStats(sensorData) {
    if (sensorData.length === 0) {
      return {
        max: NaN,
        min: NaN,
        mean: NaN,
        sd: NaN,
      };
    }
  
    const max = Math.max(...sensorData);
  
    const min = Math.min(...sensorData);
  
    const sum = sensorData.reduce((acc, currentValue) => acc + currentValue, 0);
    const mean = sum / sensorData.length;

    const sd = Math.sqrt(sensorData.map(x => Math.pow(x - mean, 2)).reduce((acc, currentValue) => acc + currentValue) / sensorData.length);
  
    return {
      max,
      min,
      mean,
      sd,
    };
  }
  
  export default calculateSensorStats;