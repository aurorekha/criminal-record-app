/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Accordion from './Accordion';

describe('Accordion', () => {
  it('should toggle the accordion content on click', () => {
    const title = 'Accordion Title';
    const postCode = "3805";
    const reportedDate= "20/03/2023";
    const count= "1222";
    const descriptionOne= "Description one";
    const descriptionTwo= "Description two";
    const descriptionThree= "Description three"

    // Render the Accordion component
    const { getByText, queryByText } = render(
      <Accordion 
        title={title} 
        postCode={postCode} 
        reportedDate={reportedDate} 
        count={count}
        descriptionOne={descriptionOne}
        descriptionTwo={descriptionTwo}
        descriptionThree={descriptionThree}
      />
    );

    // Assert that the content is initially not visible
    expect(queryByText(postCode)).toBeNull();
    expect(queryByText(reportedDate)).toBeNull();
    expect(queryByText(count)).toBeNull();
    expect(queryByText(descriptionOne)).toBeNull();
    expect(queryByText(descriptionTwo)).toBeNull();
    expect(queryByText(descriptionThree)).toBeNull();

    // Click on the accordion title
    fireEvent.click(getByText(title));

    // Assert that the content is now visible
    expect(getByText('Postcode: 3805')).toBeInTheDocument();
    expect(getByText('Reported Date: 20/03/2023')).toBeInTheDocument();
    expect(getByText('Crime count: 1222')).toBeInTheDocument();
    expect(getByText('Offence level 1 description: Description one')).toBeInTheDocument();
    expect(getByText('Offence level 2 description: Description two')).toBeInTheDocument();
    expect(getByText('Offence level 3 description: Description three')).toBeInTheDocument();

    // Click on the accordion title again
    fireEvent.click(getByText(title));

    // Assert that the content is no longer visible
    expect(queryByText(postCode)).toBeNull();
    expect(queryByText(reportedDate)).toBeNull();
    expect(queryByText(count)).toBeNull();
    expect(queryByText(descriptionOne)).toBeNull();
    expect(queryByText(descriptionTwo)).toBeNull();
    expect(queryByText(descriptionThree)).toBeNull();
  });
});

