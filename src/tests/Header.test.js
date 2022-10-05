import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente <Header /> ', () => {
  test('Verifica se as rotas corretas possuiem o <Header /> com seus itens essenciais', () => {
    const { history } = renderWithRouter(<App />);
    const paths = ['/meals', '/drinks', '/profile', '/done-recipes', '/favorite-recipes'];

    paths.forEach((path) => {
      history.push(path);
      expect(screen.getByTestId('header-id')).toBeInTheDocument();
      expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
    });
  });

  test('Verifica se em /profile, /done-recipes, /favorite-recipes as possuiem o <Header /> sem o icone de pesquisa', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks');
    const paths = ['/profile', '/done-recipes', '/favorite-recipes'];

    paths.forEach((path) => {
      history.push(path);
      expect(screen.queryByTestId('search-icon-div')).not.toBeInTheDocument();
    });
  });

  test('Verifica se ao clicar no icone da lupa, o searchBar aparece', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals');
    const btnSearch = screen.getByTestId('search-top-btn');
    const divSearchBarQuery = screen.queryByTestId('search-bar');
    expect(btnSearch).toBeInTheDocument();
    expect(divSearchBarQuery).not.toBeInTheDocument();

    userEvent.click(btnSearch);
    const divSearchBar = screen.getByTestId('search-bar');
    expect(divSearchBar).toBeInTheDocument();

    userEvent.click(btnSearch);
    expect(divSearchBarQuery).not.toBeInTheDocument();
  });

  test('Verifica se o icone, e o titulo das paginas drinks esta correto', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks');
    expect(screen.getByRole('img', { name: /icon drink/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /drinks/i })).toBeInTheDocument();
  });

  test('Verifica se o icone, e o titulo das paginas meals esta correto', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals');
    expect(screen.getByRole('img', { name: /icon meals/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /meals/i })).toBeInTheDocument();
  });
});
