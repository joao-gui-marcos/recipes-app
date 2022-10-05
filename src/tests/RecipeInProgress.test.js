import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import oneMeal from '../../cypress/mocks/oneMeal';

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
      json: jest.fn().mockResolvedValue(oneMeal),
    })
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(oneMeal),
    })
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
  renderWithRouter(<App />);
  const emailInput = screen.getByTestId(EMAIL_INPUT);
  const passwordInput = screen.getByTestId(PASSWORD_INPUT);
  const login = screen.getByTestId('login-submit-btn');
  userEvent.type(emailInput, VALID_EMAIL);
  userEvent.type(passwordInput, VALID_PASSWORD);
  userEvent.click(login);
  await waitFor(() => {
    const corba = screen.getByTestId('0-card-img');
    userEvent.click(corba);
    const startBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startBtn);
  });
  await waitFor(() => {
    copy.mockImplementation(() => null);
    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);
    const shareBtn2 = screen.getAllByRole('button', { name: /Compartilhar/i });
    userEvent.click(shareBtn2[1]);
    expect(copy).toHaveBeenCalled();
    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    const checkbox1 = screen.getByText('penne rigate');
    userEvent.click(checkbox1);
    const checkbox2 = screen.getByText('olive oil');
    userEvent.click(checkbox2);
    const checkbox3 = screen.getByText('garlic');
    userEvent.click(checkbox3);
    const checkbox4 = screen.getByText('chopped tomatoes');
    userEvent.click(checkbox4);
    const checkbox5 = screen.getByText('red chile flakes');
    userEvent.click(checkbox5);
    const checkbox6 = screen.getByText('italian seasoning');
    userEvent.click(checkbox6);
    const checkbox7 = screen.getByText('basil');
    userEvent.click(checkbox7);
    const checkbox8 = screen.getByText('Parmigiano-Reggiano');
    userEvent.click(checkbox8);
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishBtn);
  });
});
