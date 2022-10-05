import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Redirect } from 'react-router-dom';
import iconFavorited from '../images/blackHeartIcon.svg';
import iconNotFavorited from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const [mealsRoute, setMealsRoute] = useState(false);
  const [drinksRoute, setDrinksRoute] = useState(false);
  const [mealDetails, setMealDetails] = useState({});
  const [drinkDetails, setDrinkDetails] = useState({});
  const [finishButtonState, setFinishButtonState] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState(0);
  const [shareCopyBtn, setShareCopyBtn] = useState(false);
  const [storageItem, setStorageItem] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')) || []);
  const [favoriteBtn, setFavoriteBtn] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const id = parseInt(window.location.pathname.replace(/[^0-9]/g, ''), 10);
    const fetchMealDetails = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const results = await response.json();
      setMealDetails(results);
      setMealsRoute(true);
      const b = storageItem.filter((el) => el.id === results.meals[0].idMeal).length > 0;
      setFavoriteBtn(!b);
    };
    const fetchDrinkDetails = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const results = await response.json();
      setDrinkDetails(results);
      setDrinksRoute(true);
      const b = storageItem.filter((e) => e.id === results.drinks[0].idDrink).length > 0;
      setFavoriteBtn(!b);
    };
    if (window.location.pathname.includes('/meals')) fetchMealDetails();
    if (window.location.pathname.includes('/drinks')) fetchDrinkDetails();
  }, []);
  const checkIngredients = (event) => {
    if (event.target.checked === true) setCheckedIngredients(checkedIngredients + 1);
    if (event.target.checked === false) setCheckedIngredients(checkedIngredients - 1);
    if (checkedIngredients === document.getElementsByTagName('input').length - 1) {
      setFinishButtonState(false);
    } else setFinishButtonState(true);
    if (window.location.pathname.includes('/meals')) {
      const savedState = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
        drinks: {},
        meals: { [event.target.name]: [] } };
      const newState = { drinks: { ...savedState.drinks },
        meals: { ...savedState.meals,
          [event.target.name]: [...savedState.meals[event.target.name], event.target.id],
        } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
    }
    if (window.location.pathname.includes('/drinks')) {
      const savedState = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
        drinks: { [event.target.name]: [] },
        meals: {} };
      const newState = { drinks: { ...savedState.drinks,
        [event.target.name]: [...savedState.drinks[event.target.name], event.target.id],
      },
      meals: { ...savedState.meals } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
    }
  };
  const restoreChecked = (ingredient, id) => {
    const savedState = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (window.location.pathname.includes('/meals')) {
      if (Object.keys(savedState).length !== 0) {
        return !!(savedState.meals[id].includes(ingredient));
      } return false;
    }
    if (window.location.pathname.includes('/drinks')) {
      if (Object.keys(savedState).length !== 0) {
        return !!(savedState.drinks[id].includes(ingredient));
      } return false;
    }
  };
  const handleClickShare = () => {
    const id = parseInt(window.location.pathname.replace(/[^0-9]/g, ''), 10);
    setShareCopyBtn(true);
    if (window.location.pathname.includes('/meals')) copy(`http://localhost:3000/meals/${id}`);
    if (window.location.pathname.includes('/drinks')) copy(`http://localhost:3000/drinks/${id}`);
  };
  const handleFavoriteBtn = () => {
    let recipe = {};
    if (window.location.pathname.includes('/meals')) {
      recipe = {
        id: mealDetails.meals[0].idMeal,
        type: 'meal',
        nationality: mealDetails.meals[0].strArea,
        category: mealDetails.meals[0].strCategory,
        alcoholicOrNot: '',
        name: mealDetails.meals[0].strMeal,
        image: mealDetails.meals[0].strMealThumb };
    }
    if (window.location.pathname.includes('/drinks')) {
      recipe = {
        id: drinkDetails.drinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: drinkDetails.drinks[0].strCategory,
        alcoholicOrNot: drinkDetails.drinks[0].strAlcoholic,
        name: drinkDetails.drinks[0].strDrink,
        image: drinkDetails.drinks[0].strDrinkThumb };
    }
    const isFavorited = storageItem.filter((el) => el.id === recipe.id).length > 0;
    setFavoriteBtn(isFavorited);
    if (!isFavorited) {
      const newStorage = [...storageItem, recipe];
      setStorageItem(newStorage);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    } else {
      const newStorage = storageItem.filter((el) => el.id !== recipe.id);
      setStorageItem(newStorage);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
  };
  return (
    <div>
      Recipe in Progress
      {mealsRoute && mealDetails.meals.map((elem, index) => (
        <div key={ index }>
          <img
            alt="meal-thumbnail"
            src={ elem.strMealThumb }
            width="200"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ elem.strMeal }</p>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleClickShare }
          >
            Compartilhar
          </button>
          { shareCopyBtn && (
            <p>
              Link copied!
              <button
                type="button"
                onClick={ () => setShareCopyBtn(false) }
                data-testid="share-btn2"
              >
                Compartilhar
              </button>
            </p>) }
          <button
            data-testid="favorite-btn"
            type="button"
            onClick={ handleFavoriteBtn }
            src={ favoriteBtn ? iconNotFavorited : iconFavorited }
          >
            {favoriteBtn ? (
              <img src={ iconNotFavorited } alt="Favorite" width="50" />)
              : (<img src={ iconFavorited } alt="Favorite" width="50" />)}
          </button>
          <p data-testid="recipe-category">{ elem.strCategory }</p>
          <p data-testid="instructions">{ elem.strInstructions }</p>
          {Object.keys(mealDetails.meals[0])
            .filter((e) => e.includes('strIngredient'))
            .map((e2, i) => mealDetails.meals[0][e2]
          && (
            <div key={ i }>
              <label
                data-testid={ `${i}-ingredient-step` }
                htmlFor={ mealDetails.meals[0][e2] }
              >
                {mealDetails.meals[0][e2]}
                <input
                  type="checkbox"
                  id={ mealDetails.meals[0][e2] }
                  name={ elem.idMeal }
                  onClick={ checkIngredients }
                  checked={ restoreChecked(mealDetails.meals[0][e2], elem.idMeal) }
                />
              </label>
            </div>))}
        </div>))}
      {drinksRoute && drinkDetails.drinks.map((elem, index) => (
        <div key={ index }>
          <img
            alt="meal-thumbnail"
            src={ elem.strDrinkThumb }
            width="200"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ elem.strDrink }</p>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleClickShare }
          >
            Compartilhar
          </button>
          { shareCopyBtn && (
            <p>
              Link copied!
              <button
                type="button"
                onClick={ () => setShareCopyBtn(false) }
              >
                Compartilhar
              </button>
            </p>) }
          <button
            data-testid="favorite-btn"
            type="button"
            onClick={ handleFavoriteBtn }
            src={ favoriteBtn ? iconNotFavorited : iconFavorited }
          >
            {favoriteBtn ? (
              <img src={ iconNotFavorited } alt="Favorite" width="50" />)
              : (<img src={ iconFavorited } alt="Favorite" width="50" />)}
          </button>
          <p data-testid="recipe-category">{ elem.strCategory }</p>
          <p data-testid="instructions">{ elem.strInstructions }</p>
          {Object.keys(drinkDetails.drinks[0])
            .filter((e) => e.includes('strIngredient'))
            .map((e2, i) => drinkDetails.drinks[0][e2] && (
              <div key={ i }>
                <label
                  data-testid={ `${i}-ingredient-step` }
                  htmlFor={ drinkDetails.drinks[0][e2] }
                >
                  {drinkDetails.drinks[0][e2]}
                  <input
                    type="checkbox"
                    id={ drinkDetails.drinks[0][e2] }
                    name={ elem.idDrink }
                    onClick={ checkIngredients }
                    checked={ restoreChecked(drinkDetails.drinks[0][e2], elem.idDrink) }
                  />
                </label>
              </div>))}
        </div>))}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ finishButtonState }
        onClick={ () => setRedirect(true) }
      >
        Finish Recipe
      </button>
      {redirect && <Redirect to="/done-recipes" />}
    </div>
  );
} export default RecipeInProgress;