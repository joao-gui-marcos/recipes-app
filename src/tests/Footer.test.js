import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../components/Footer';

test('Check if Footer contains Drink and Meals icon', () => {
  const { history } = renderWithRouter(<Footer />);
  history.push('/meals');
  expect(history.location.pathname).toBe('/meals');
  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  const mealsIcon = screen.getByTestId('meals-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();
  expect(mealsIcon).toBeInTheDocument();
});
