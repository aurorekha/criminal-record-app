/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Accordion from './Accordion';

describe('Accordion', () => {
  it('should toggle the accordion content on click', () => {
    const title = 'Accordion Title';
    const content = 'Accordion Content';

    // Render the Accordion component
    const { getByText, queryByText } = render(
      <Accordion title={title} content={content} />
    );

    // Assert that the content is initially not visible
    expect(queryByText(content)).toBeNull();

    // Click on the accordion title
    fireEvent.click(getByText(title));

    // Assert that the content is now visible
    expect(getByText(content)).toBeInTheDocument();

    // Click on the accordion title again
    fireEvent.click(getByText(title));

    // Assert that the content is no longer visible
    expect(queryByText(content)).toBeNull();
  });
});

