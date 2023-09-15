import { saveAs } from 'file-saver';

function convertToCSV(data) {
    if (!Array.isArray(data)) {
      throw new Error('Data should be an array of objects.');
    }
  
    if (data.length === 0) {
      return '';
    }
  
    const header = Object.keys(data[0]).join(',');
    const csv = [header];
  
    data.forEach((item) => {
      const row = Object.values(item).join(',');
      csv.push(row);
    });
  
    return csv.join('\n');
  }

function downloadCSV(data, filename) {
  const csv = convertToCSV(data);
  if (csv === '') {
    return;
  }
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
}

export {convertToCSV, downloadCSV};