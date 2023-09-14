
function StandardDeviation (array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
  }

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

    const sd = StandardDeviation(...sensorData);
  
    return {
      max,
      min,
      mean,
      sd,
    };
  }
  
  export default calculateSensorStats;