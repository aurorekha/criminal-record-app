import React, { useState } from 'react';
import './style.css'
const Accordion = ({ title, count, descriptionOne, descriptionTwo, descriptionThree, postCode, reportedDate }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="accordion-item">
      <div onClick={() => setIsActive(!isActive)}>
        <div className="accordion-title-text">{title} {isActive ? <span>&#8593;</span> : <span>&#8595;</span>}</div>
      </div>
        {isActive && 
        <div className="accordion-content">
          <p className="para-styles">Reported Date: {reportedDate}</p> 
          <p className="para-styles">Crime count: {count}</p> 
          <p className="para-styles">Offence level 1 description: {descriptionOne}</p>  
          <p className="para-styles">Offence level 2 description: {descriptionTwo} </p> 
          <p className="para-styles">Offence level 3 description: {descriptionThree} </p>
          <p className="para-styles">Postcode: {postCode}</p>
      </div>}
    </div>
  );
};

export default Accordion;