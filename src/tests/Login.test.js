import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const VALID_EMAIL = 'any@email.com';
const VALID_PASSWORD = '1234567';
const INVALID_EMAIL = 'any@';
const INVALID_PASSWORD = '1234';

describe('Testa a página de Login', () => {
  it('Testa se existem os inputs', () => {
    const { history } = renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const login = screen.getByRole('button', { name: /Enter/i });
    expect(history.location.pathname).toBe('/');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(login).toBeInTheDocument();
    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(login).toBeDisabled();
    expect(emailInput).toHaveValue(INVALID_EMAIL);
  });

  it('Testa se o botão "Enter" fica desabilitado com email e senha inválidos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const login = screen.getByRole('button', { name: /Enter/i });
    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(login).toBeDisabled();
  });

  it('Testa se o botão "Enter" é habilitado com email e senha válidos', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const login = screen.getByRole('button', { name: /Enter/i });
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(emailInput).toHaveValue(VALID_EMAIL);
    expect(passwordInput).toHaveValue(VALID_PASSWORD);
    expect(login).toBeEnabled();
  });

  it('Testa se o botão "Enter" redireciona para página de receitas', () => {
    const { history } = renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const login = screen.getByTestId('login-submit-btn');
    expect(history.location.pathname).toBe('/');
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(login);
    expect(history.location.pathname).toBe('/meals');
  });
});
