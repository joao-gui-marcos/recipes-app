import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import oneDrink from '../../cypress/mocks/oneDrink';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const VALID_EMAIL = 'any@email.com';
const VALID_PASSWORD = '1234567';

jest.mock('clipboard-copy', () => jest.fn());
const copy = require('clipboard-copy');

test('', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(meals),
  })
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealCategories),
    })
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    })
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkCategories),
    })
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    })
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(oneDrink),
    })
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
  // .mockResolvedValueOnce({
  //   json: jest.fn().mockResolvedValue(oneDrink),
  // })
  // .mockResolvedValueOnce({
  //   json: jest.fn().mockResolvedValue(oneDrink),
  // })
  // .mockResolvedValueOnce({
  //   json: jest.fn().mockResolvedValue(oneDrink),
  // });
  renderWithRouter(<App />);
  const emailInput = screen.getByTestId(EMAIL_INPUT);
  const passwordInput = screen.getByTestId(PASSWORD_INPUT);
  const login = screen.getByTestId('login-submit-btn');
  userEvent.type(emailInput, VALID_EMAIL);
  userEvent.type(passwordInput, VALID_PASSWORD);
  userEvent.click(login);
  await waitFor(() => {
    const corba = screen.getByTestId('0-card-img');
    expect(corba).toBeInTheDocument();
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBtn);
    // const startBtn = screen.getByTestId('start-recipe-btn');
    // userEvent.click(startBtn);
  });
  await waitFor(() => {
    const gg = screen.getByTestId('0-card-img');
    // expect(gg).toHaveTextContent('GG');
    userEvent.click(gg);
    // const startBtn = screen.getByTestId('start-recipe-btn');
  });
  await waitFor(() => {
    console.log(window.location.pathname);
    const startBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startBtn);
  });
  await waitFor(() => {
    copy.mockImplementation(() => null);
    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);
    expect(copy).toHaveBeenCalled();
    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    const checkbox1 = screen.getByText('Hpnotiq');
    userEvent.click(checkbox1);
    const checkbox2 = screen.getByText('Pineapple Juice');
    userEvent.click(checkbox2);
    const checkbox3 = screen.getByText('Banana Liqueur');
    userEvent.click(checkbox3);
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishBtn);
  });
  await waitFor(() => {
    copy.mockImplementation(() => null);
    const shareBtn2 = screen.getAllByRole('button', { name: /Compartilhar/i });
    userEvent.click(shareBtn2[1]);
    expect(copy).toHaveBeenCalled();
    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    const checkbox1 = screen.getByText('Hpnotiq');
    userEvent.click(checkbox1);
    const checkbox2 = screen.getByText('Pineapple Juice');
    userEvent.click(checkbox2);
    const checkbox3 = screen.getByText('Banana Liqueur');
    userEvent.click(checkbox3);
    userEvent.click(favoriteBtn);
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishBtn);
  });
});
