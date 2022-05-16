import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Title of the game', () => {
  render(<App />);
  const headerElement = screen.getByText(/BINGO/i);
  expect(headerElement).toBeInTheDocument();
});


