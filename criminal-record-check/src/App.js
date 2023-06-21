import React, {useState} from 'react';
import Accordion from './components/Accordion';

const App = () => {
  const [accordionData, setAccordionData] = useState([])
  
  return (
    <div>
      <h1>React Accordion Demo</h1>
      <div className="accordion">
        {accordionData?.map(({ title, content }) => (
          <Accordion key={title} title={title} content={content} />
        ))}
      </div>
    </div>
  );
};

export default App;