import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';

const searchTopBtn = 'search-top-btn';

describe('Testa o componente <Searchbar />', () => {
  test('4-Verifica se quando apenas 1 prato é encontrado em meals, se o usuario é redirecionado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);

    const radioName = screen.getByRole('radio', { name: /nome/i });
    const inputSearch = screen.getByRole('textbox');
    const btnBuscar = screen.getByRole('button', { name: /buscar/i });

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'burek');
    userEvent.click(btnBuscar);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/53060'));
  });

  test('5-Verifica se quando apenas 1 prato é encontrado em drinks, se o usuario é redirecionado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);

    const radioName = screen.getByRole('radio', { name: /nome/i });
    const inputSearch = screen.getByRole('textbox');
    const btnBuscar = screen.getByRole('button', { name: /buscar/i });

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'Coffee-Vodka');
    userEvent.click(btnBuscar);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/12800'));
  });

  test('6-Verifica se retorna um alert se não houver resultados de busca em drinks', async () => {
    global.alert = jest.fn(() => '');
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);

    const radioName = screen.getByRole('radio', { name: /nome/i });
    const inputSearch = screen.getByRole('textbox');

    const btnBuscar = screen.getByRole('button', { name: /buscar/i });

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'Xuxu');
    userEvent.click(btnBuscar);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
    global.alert.mockClear();
  });

  test('7-Verifica se os componentes de Searchbar existem e funcionam na tela de drinks ', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(drinks),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

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

    // expect()
  });
});
