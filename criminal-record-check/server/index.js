const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Define the API route
app.get('/api/data', (req, res) => {
  const results = [];
  
  // Read the CSV file
  fs.createReadStream('crime_record.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

app.use(cors());

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});