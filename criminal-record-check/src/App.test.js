import { render, screen } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import userEvent from '@testing-library/user-event';
import Accordion from './components/Accordion';
import App from './App';

describe('renders learn react link', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  const title = 'Accordion Title';
  const postCode = "3805";
  const reportedDate= "20/03/2023";
  const count= "1222";
  const descriptionOne= "Description one";
  const descriptionTwo= "Description two";
  const descriptionThree= "Description three"

  it('fetches data and displays the records', async () => {
    const mockedRecords = [
      {
        title,
        "Offence count": `${count}`,
        "Offence Level 1 Description": `${descriptionOne}`,
        "Offence Level 2 Description": `${descriptionTwo}`,
        "Offence Level 3 Description": `${descriptionThree}`,
        "Postcode": `${postCode}`,
        "Reported Date": `${reportedDate}`
      },
      // Add more mocked records as needed
    ];

    fetchMock.get('http://localhost:8000/api/records', {
      status: 200,
      body: mockedRecords,
    });

    render(<Accordion 
        title={title} 
        postCode={postCode} 
        reportedDate={reportedDate} 
        count={count}
        descriptionOne={descriptionOne}
        descriptionTwo={descriptionTwo}
        descriptionThree={descriptionThree}
      />);

    const accordionItem = screen.getByText('Accordion Title');
    expect(accordionItem).toBeInTheDocument();

    userEvent.click(accordionItem);

    const crimeCount = screen.getByText('Crime count: 1222');
    expect(crimeCount).toBeInTheDocument();

    const reportedDateText = screen.getByText('Reported Date: 20/03/2023');
    expect(reportedDateText).toBeInTheDocument();

    const description1 = screen.getByText('Offence level 1 description: Description one');
    expect(description1).toBeInTheDocument();

    const description2 = screen.getByText('Offence level 2 description: Description two');
    expect(description2).toBeInTheDocument();
    
    const description3 = screen.getByText('Offence level 3 description: Description three');
    expect(description3).toBeInTheDocument();
    
    const postcodeText = screen.getByText('Postcode: 3805');
    expect(postcodeText).toBeInTheDocument();
  });

  // const linkElement = screen.getByText(/accordion/i);
  // expect(linkElement).toBeInTheDocument();
});
