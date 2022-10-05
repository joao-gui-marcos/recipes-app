import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import MockDoneRecipes from './helpers/MockDoneRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import App from '../App';

const doneRecipes = '/done-recipes';
const titleRecipe = '0-horizontal-name';

localStorage.setItem('doneRecipes', JSON.stringify(MockDoneRecipes));
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});
jest.spyOn(navigator.clipboard, 'writeText');

describe('Testes da página Done Recipes', () => {
  it('Testa se existem botões na página', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(MockDoneRecipes));
    renderWithRouter(<DoneRecipes />);
    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    expect(filterAllButton).toBeInTheDocument();
    userEvent.click(filterAllButton);
    const filterMealButton = screen.getByTestId('filter-by-meal-btn');
    expect(filterMealButton).toBeInTheDocument();
    userEvent.click(filterMealButton);
    const filterDrinkButton = screen.getByTestId('filter-by-drink-btn');
    expect(filterDrinkButton).toBeInTheDocument();
    userEvent.click(filterDrinkButton);
    const shareBtn0 = screen.getByTestId(`${0}-horizontal-share-btn`);
    expect(shareBtn0).toBeInTheDocument();
    userEvent.click(shareBtn0);
    const shareBtn1 = screen.getByTestId(`${1}-horizontal-share-btn`);
    expect(shareBtn1).toBeInTheDocument();
    userEvent.click(shareBtn1);
  });

  it('Testa se o botão All filtra corretamente', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(MockDoneRecipes));
    act(() => history.push(doneRecipes));
    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    const mealImg = screen.queryByAltText(/burek/i);
    const drinkImg = screen.queryByAltText(/acid/i);
    expect(filterAllButton).toBeInTheDocument();
    userEvent.click(filterAllButton);
    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
  });

  it('Testa se o botão Meal filtra corretamente', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(MockDoneRecipes));
    act(() => history.push(doneRecipes));
    const filterMealButton = screen.getByTestId('filter-by-meal-btn');
    const mealImg = screen.queryByAltText(/burek/i);
    const drinkImg = screen.queryByAltText(/acid/i);
    expect(filterMealButton).toBeInTheDocument();
    userEvent.click(filterMealButton);
    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).not.toBeInTheDocument();
  });

  it('Testa se o botão Drink filtra corretamente', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(MockDoneRecipes));
    act(() => history.push(doneRecipes));
    const filterDrinkButton = screen.getByTestId('filter-by-drink-btn');
    const mealImg = screen.queryByAltText(/burek/i);
    const drinkImg = screen.queryByAltText(/acid/i);
    expect(filterDrinkButton).toBeInTheDocument();
    userEvent.click(filterDrinkButton);
    expect(drinkImg).toBeInTheDocument();
    expect(mealImg).not.toBeInTheDocument();
  });

  it('Testa se ao clicar no ícone de share o link da receita é copiado', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => { 'link copied!'; },
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(MockDoneRecipes));
    act(() => history.push(doneRecipes));
    const shareBtn0 = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn0);
    await waitFor(() => expect(screen.getByText(/link copied!/i)).toBeInTheDocument());
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('Testa se a imagem redireciona para a página da receita ao ser clicado', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(MockDoneRecipes));
    act(() => history.push(doneRecipes));
    const mealImg = screen.queryByAltText(/burek/i);
    userEvent.click(mealImg);
    expect(history.location.pathname).toBe('/meals/0');
  });

  it('Testa se ao clicar no nome da receita é redirecionado para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(MockDoneRecipes));
    act(() => history.push(doneRecipes));
    const title = screen.getByTestId(titleRecipe);
    userEvent.click(title);
    expect(history.location.pathname).toBe('/meals/0');
  });
});
