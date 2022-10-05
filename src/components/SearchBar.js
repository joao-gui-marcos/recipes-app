import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchMeals, fetchDrinks } from '../Services';

function SearchBar() {
  const location = useLocation();
  const [filterInput, setFilterInput] = useState('');
  const { inputSearchBar, setInputSearchBar,
    setDrinksRecipes, setMealsRecipes } = useContext(MyContext);

  const history = useHistory();

  const handleChangeSearchBar = ({ target: { value } }) => {
    setInputSearchBar(value);
  };

  const handleChangeInputs = ({ target: { value } }) => {
    setFilterInput(value);
  };

  const handleClick = async () => {
    if (filterInput === 'primeira-letra' && inputSearchBar.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }

    if (location.pathname === '/meals') {
      const meals = await fetchMeals(inputSearchBar, filterInput);
      if (meals.meals === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (meals.meals.length === 1) {
        return history.push(`/meals/${meals.meals[0].idMeal}`);
      }
      return setMealsRecipes(meals.meals);
    }

    if (location.pathname === '/drinks') {
      const drinks = await fetchDrinks(inputSearchBar, filterInput);
      if (drinks.drinks === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (drinks.drinks.length === 1) {
        return history.push(`/drinks/${drinks.drinks[0].idDrink}`);
      }
      return setDrinksRecipes(drinks.drinks);
    }
  };

  return (
    <div className="search-bar" data-testid="search-bar">
      <div id="container-radios">
        <label htmlFor="ingrediente">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="radioBtn"
            id="ingrediente"
            value="ingrediente"
            onChange={ handleChangeInputs }
          />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input
            type="radio"
            data-testid="name-search-radio"
            name="radioBtn"
            id="nome"
            value="nome"
            onChange={ handleChangeInputs }
          />
          Nome
        </label>
        <label htmlFor="primeira-letra">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="radioBtn"
            id="primeira-letra"
            value="primeira-letra"
            onChange={ handleChangeInputs }
          />
          Primeira letra
        </label>
      </div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChangeSearchBar }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar

      </button>
    </div>
  );
}

export default SearchBar;
