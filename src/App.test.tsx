import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FastLog header', () => {
  render(<App />);
  const headerElement = screen.getByText(/FastLog/i);
  expect(headerElement).toBeInTheDocument();
});
