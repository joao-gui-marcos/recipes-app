import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import MockFavoriteRecipes from './helpers/MockFavoriteRecipes';
import App from '../App';

const favoriteRecipes = '/favorite-recipes';
const titleRecipe = '0-horizontal-name';

describe('Testes da página Favorite Recipes', () => {
  it('Testa se o botão All filtra corretamente', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockFavoriteRecipes));
    act(() => history.push(favoriteRecipes));
    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    const mealImg = screen.queryByAltText(/corba/i);
    const drinkImg = screen.queryByAltText(/al/i);
    expect(filterAllButton).toBeInTheDocument();
    userEvent.click(filterAllButton);
    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
  });

  it('Testa se o botão Meal filtra corretamente', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockFavoriteRecipes));
    act(() => history.push(favoriteRecipes));
    const filterMealButton = screen.getByTestId('filter-by-meal-btn');
    const mealImg = screen.queryByAltText(/corba/i);
    const drinkImg = screen.queryByAltText(/al/i);
    expect(filterMealButton).toBeInTheDocument();
    userEvent.click(filterMealButton);
    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).not.toBeInTheDocument();
  });

  it('Testa se o botão Drink filtra corretamente', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockFavoriteRecipes));
    act(() => history.push(favoriteRecipes));
    const filterDrinkButton = screen.getByTestId('filter-by-drink-btn');
    const mealImg = screen.queryByAltText(/corba/i);
    const drinkImg = screen.queryByAltText(/al/i);
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
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockFavoriteRecipes));
    act(() => history.push(favoriteRecipes));
    const shareBtn0 = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn0);
    await waitFor(() => expect(screen.getByText(/link copied!/i)).toBeInTheDocument());
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('Testa se a imagem redireciona para a página da receita ao ser clicado', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockFavoriteRecipes));
    act(() => history.push(favoriteRecipes));
    const mealImg = screen.queryByAltText(/corba/i);
    userEvent.click(mealImg);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Testa se ao clicar no nome da receita é redirecionado para página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockFavoriteRecipes));
    act(() => history.push(favoriteRecipes));
    const title = screen.getByTestId(titleRecipe);
    userEvent.click(title);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Testa se a imagem redireciona para a página da receita ao ser clicado', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockFavoriteRecipes));
    act(() => history.push(favoriteRecipes));
    const drinkImg = screen.queryByAltText(/al/i);
    userEvent.click(drinkImg);
    expect(history.location.pathname).toBe('/drinks/17222');
  });

  it('Testa se ao clicar no nome da receita é redirecionado para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockFavoriteRecipes));
    act(() => history.push(favoriteRecipes));
    const title = screen.getByTestId('1-horizontal-name');
    userEvent.click(title);
    expect(history.location.pathname).toBe('/drinks/17222');
  });

  it('Testa se remove a receita dos favoritos', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockFavoriteRecipes));
    act(() => history.push(favoriteRecipes));
    const unfavBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const img = screen.queryByAltText(/corba/i);
    const title = screen.getByTestId(titleRecipe);
    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    userEvent.click(unfavBtn);
    expect(screen.queryAllByAltText(/corba/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(titleRecipe)).not.toBeInTheDocument();
  });
});
