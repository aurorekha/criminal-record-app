import React, {useState, useEffect} from 'react';
import Accordion from './components/Accordion';
import './App.css';

const App = () => {
  const [accordionData, setAccordionData] = useState([])
  const [groupByOffenceLevel2, setGroupByOffenceLevel2] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/records');
      
      const records = await response.json();

      const groupedSuburbIncidents = {};
      records.forEach((record) => {
        const suburbIncident = `${record["Suburb - Incident"]}`;
        if (groupedSuburbIncidents[suburbIncident]) {
          groupedSuburbIncidents[suburbIncident].count +=  record['Offence count'];
        } else {
          groupedSuburbIncidents[suburbIncident] = {
            suburbIncident,
            count: record['Offence count'],
            descriptionOne: record['Offence Level 1 Description'],
            descriptionTwo: record['Offence Level 2 Description'],
            descriptionThree: record['Offence Level 3 Description'],
            postCode: record['Postcode - Incident'],
            reportedDate: record['Reported Date']
          };
        }
      });

      setAccordionData(Object.values(groupedSuburbIncidents));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // Fetch all records

  useEffect(() => {
    // Make the API call to fetch all records
    fetchData();
    setGroupByOffenceLevel2(!groupByOffenceLevel2);
  }, []);

  const handleGroupByOffenceLevel2 = () => {
    setGroupByOffenceLevel2(!groupByOffenceLevel2);
      if(groupByOffenceLevel2) {
        const sortedRecords = [...accordionData];
      sortedRecords.sort((a, b) => {
        const aDescription = a['descriptionTwo'];
        const bDescription = b['descriptionTwo'];
        console.log(a)
        if (aDescription?.charAt(0) < bDescription?.charAt(0)) {
          setGroupByOffenceLevel2(groupByOffenceLevel2);
          return -1;
        }
        if (aDescription?.charAt(0) > bDescription?.charAt(0)) {
          setGroupByOffenceLevel2(!groupByOffenceLevel2);
          return 1;
        }
        return 0;
      });
      setAccordionData(sortedRecords);
    } else {
      fetchData()
    }
    
  };

  return (
    <div>
      <h1>React accordion</h1>
      <div className="accordion">
        <button className="group-button" onClick={handleGroupByOffenceLevel2}>
          {groupByOffenceLevel2 ? 'Group by offence level 2' : 'Ungroup by offence level 2'}
        </button>
        {
        accordionData?.map(( item, index) => (
            <Accordion 
              key={index} 
              postCode={item.postCode} 
              title={item?.suburbIncident} 
              reportedDate={item?.reportedDate}
              count={item?.count} 
              descriptionOne={item?.descriptionOne} 
              descriptionTwo={item?.descriptionTwo} 
              descriptionThree={item?.descriptionThree}
            />
        ))}
      </div>
    </div>
  );
};

export default App;