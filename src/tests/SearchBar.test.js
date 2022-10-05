import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

const searchTopBtn = 'search-top-btn';

describe('Testa o componente <Searchbar />', () => {
  test('1-Verifica se os componentes de Searchbar existem e funcionam na tela de meals', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const btnSearch = screen.getByTestId(searchTopBtn);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    const divSearchBar = screen.getByTestId('search-bar');
    expect(divSearchBar).toBeInTheDocument();

    const radioIngrediente = screen.getByRole('radio', { name: /ingrediente/i });
    expect(radioIngrediente).toBeInTheDocument();
    const radioName = screen.getByRole('radio', { name: /nome/i });
    expect(radioName).toBeInTheDocument();
    const radioFirstL = screen.getByRole('radio', { name: /primeira letra/i });
    expect(radioFirstL).toBeInTheDocument();

    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    const btnBuscar = screen.getByRole('button', { name: /buscar/i });
    expect(btnBuscar).toBeInTheDocument();

    userEvent.click(radioIngrediente);
    userEvent.type(inputSearch, 'milk');
    userEvent.click(btnBuscar);
  });

  test('2-Verifica se retorna um alert se não houver resultados de busca em meals', async () => {
    global.alert = jest.fn(() => '');
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);

    const radioIngrediente = screen.getByRole('radio', { name: /ingrediente/i });
    const inputSearch = screen.getByRole('textbox');

    const btnBuscar = screen.getByRole('button', { name: /buscar/i });

    userEvent.click(radioIngrediente);
    userEvent.type(inputSearch, 'Xablau');
    userEvent.click(btnBuscar);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
    global.alert.mockClear();
  });

  test('3-Verifica se ao colocar mais de 1 letra retorna um alert "Your search must have only 1 (one) character"', async () => {
    global.alert = jest.fn(() => '');
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);

    const radioFirstL = screen.getByRole('radio', { name: /primeira letra/i });

    const inputSearch = screen.getByRole('textbox');

    const btnBuscar = screen.getByRole('button', { name: /buscar/i });

    userEvent.click(radioFirstL);
    userEvent.type(inputSearch, 'ab');
    userEvent.click(btnBuscar);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
    global.alert.mockClear();
  });

  test('8-Verifica se os componentes de Searchbar existem e funcionam na tela de meals ', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(meals),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const btnSearch = screen.getByTestId(searchTopBtn);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    const divSearchBar = screen.getByTestId('search-bar');
    expect(divSearchBar).toBeInTheDocument();

    const radioIngrediente = screen.getByRole('radio', { name: /ingrediente/i });
    expect(radioIngrediente).toBeInTheDocument();
    const radioName = screen.getByRole('radio', { name: /nome/i });
    expect(radioName).toBeInTheDocument();
    const radioFirstL = screen.getByRole('radio', { name: /primeira letra/i });
    expect(radioFirstL).toBeInTheDocument();

    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    const btnBuscar = screen.getByRole('button', { name: /buscar/i });
    expect(btnBuscar).toBeInTheDocument();

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'soup');
    userEvent.click(btnBuscar);

    // expect()
  });
});
