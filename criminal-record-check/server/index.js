const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.options('*', cors());

// Define api for all records
const records = [];
fs.createReadStream('crime_record.csv')
  .pipe(csv())
  .on('data', (data) => records.push(data))
  .on('end', () => {
    console.log('CSV data loaded');
  });

// all records
  app.get('/api/records', (req, res) => {
    res.json(records);
  });


// Return records filtered by 'Reported Date'
app.get('/api/records/by-date', (req, res) => {
    const { date } = req.query;
    const filteredRecords = records.filter((record) => record['Reported Date'] === date);
    res.json(filteredRecords);
  });


// Return 'Offence count' by 'Offence Level 1 Description'
app.get('/api/offence-count', (req, res) => {
    const offenceCounts = {};
    records.forEach((record) => {
      const offence = record['Offence Level 1 Description'];
      if (offenceCounts[offence]) {
        offenceCounts[offence]++;
      } else {
        offenceCounts[offence] = 1;
      }
    });
    res.json(offenceCounts);
  });

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});