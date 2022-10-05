import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa a tela Profile', () => {
  it('Testa se ao clicar no botão "Done Recipes" é direcionado para tela de receitas feitas', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');

    userEvent.click(doneRecipesBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testa se ao clicar no botão "Logout" é redirecionado para tela de login', () => {
    const { history } = renderWithRouter(<Profile />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    userEvent.click(logoutBtn);

    expect(history.location.pathname).toBe('/');
  });
});
