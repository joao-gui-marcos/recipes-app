import React, { useEffect, useState, useContext } from 'react';
import RecipeCard from '../components/RecipeCard';
import MyContext from '../context/MyContext';

function Recipes() {
  const [mealsRoute, setMealsRoute] = useState(false);
  const [drinksRoute, setDrinksRoute] = useState(false);
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});
  const [mealsCategories, setMealsCategories] = useState({});
  const [drinksCategories, setDrinksCategories] = useState({});
  const [mealsToShow, setMealsToShow] = useState({});
  const [drinksToShow, setDrinksToShow] = useState({});
  const [mealsFilterBoo, setMealsFilterBool] = useState(false);
  const [drinksFilterBoo, setDrinksFilterBool] = useState(false);
  const { inputSearchBar } = useContext(MyContext);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const results = await response.json();
      setMeals(results);
      setMealsToShow(results);
      const response2 = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const results2 = await response2.json();
      setMealsCategories(results2);
      setMealsRoute(true);
    };
    const fetchDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const results = await response.json();
      setDrinks(results);
      setDrinksToShow(results);
      const response2 = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const results2 = await response2.json();
      setDrinksCategories(results2);
      setDrinksRoute(true);
    };
    if (window.location.pathname === '/meals') {
      fetchMeals();
    }
    if (window.location.pathname === '/drinks') {
      fetchDrinks();
    }
  }, []);
  const filterMealsByCategory = async (event) => {
    if (mealsFilterBoo === false) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${event.target.name}`);
      const results = await response.json();
      setMealsToShow(results);
      setMealsFilterBool(true);
    }
    if (mealsFilterBoo === true) {
      setMealsToShow(meals);
      setMealsFilterBool(false);
    }
  };
  const filterDrinksByCategory = async (event) => {
    if (drinksFilterBoo === false) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${event.target.name}`);
      const results = await response.json();
      setDrinksToShow(results);
      setDrinksFilterBool(true);
    }
    if (drinksFilterBoo === true) {
      setDrinksToShow(drinks);
      setDrinksFilterBool(false);
    }
  };
  const resetMealsFilter = () => {
    setMealsToShow(meals);
  };
  const resetDrinksFilter = () => {
    setDrinksToShow(drinks);
  };
  const maxRecipes = 12;
  const maxCategories = 5;
  return (
    <div>
      { mealsRoute
      && (
        <button
          data-testid="All-category-filter"
          onClick={ resetMealsFilter }
          type="button"
        >
          All

        </button>)}
      { drinksRoute
      && (
        <button
          data-testid="All-category-filter"
          onClick={ resetDrinksFilter }
          type="button"
        >
          All
        </button>) }
      { mealsRoute
        && mealsCategories.meals.map((elem, index) => (
          index < maxCategories
            ? (
              <button
                key={ index }
                type="button"
                data-testid={ `${elem.strCategory}-category-filter` }
                name={ elem.strCategory }
                onClick={ filterMealsByCategory }
              >
                {elem.strCategory}

              </button>
            )
            : null
        ))}
      { mealsRoute && inputSearchBar.length === 0
        && mealsToShow.meals.map((elem, index) => (
          index < maxRecipes
            ? (
              <div data-testid={ `${index}-recipe-card` } key={ index }>
                <RecipeCard
                  index={ index }
                  name={ elem.strMeal }
                  image={ elem.strMealThumb }
                  id={ Number(elem.idMeal) }
                  meal
                />
              </div>
            )
            : null
        ))}
      { drinksRoute
        && drinksCategories.drinks.map((elem, index) => (
          index < maxCategories
            ? (
              <button
                type="button"
                key={ index }
                data-testid={ `${elem.strCategory}-category-filter` }
                name={ elem.strCategory }
                onClick={ filterDrinksByCategory }
              >
                { elem.strCategory }
              </button>
            )
            : null
        ))}
      { drinksRoute
        && drinksToShow.drinks.map((elem, index) => (
          index < maxRecipes
            ? (
              <div data-testid={ `${index}-recipe-card` } key={ index }>
                <RecipeCard
                  index={ index }
                  name={ elem.strDrink }
                  image={ elem.strDrinkThumb }
                  id={ Number(elem.idDrink) }
                  meal={ false }
                />
              </div>
            )
            : null
        ))}
    </div>
  );
}

export default Recipes;
