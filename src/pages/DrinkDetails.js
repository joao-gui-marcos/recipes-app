import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import MyContext from '../context/MyContext';
import '../style/Carousel.css';
import iconFavorited from '../images/blackHeartIcon.svg';
import iconNotFavorited from '../images/whiteHeartIcon.svg';

function DrinkDetails() {
  const { id } = useParams();
  const [drinkDetails, setDrinkDetails] = useState({});
  const { recommendationMeals, setRecommendationMeals } = useContext(MyContext);
  const history = useHistory();
  const [shareCopyBtn, setShareCopyBtn] = useState(false);
  const [storageItem, setStorageItem] = useState(() => JSON
    .parse(localStorage.getItem('favoriteRecipes') || '[]'));

  useEffect(() => {
    const fetchApiMeals = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRecommendationMeals(data.meals);
      } catch (error) {
        console.log('API endpoint not found');
      }
    };
    fetchApiMeals();
  }, []); // eslint-disable-line

  const CARDS_MAXIMUM = 6;

  useEffect(() => {
    const fetchDrink = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDrinkDetails(data.drinks[0]);
    };
    fetchDrink();
  }, [id]);

  const getIngredients = () => {
    const ingredients = [];
    const maxIngredients = 15;
    for (let index = 0; index <= maxIngredients; index += 1) {
      const ingredient = `strIngredient${index}`;
      const measure = `strMeasure${index}`;
      if (drinkDetails[ingredient] && drinkDetails[measure] !== null) {
        ingredients.push(`${drinkDetails[ingredient]} (${drinkDetails[measure]}) `);
      }
    }
    return ingredients;
  };

  let btnDisappear = '';
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipes !== null) {
    btnDisappear = doneRecipes.some((recipe) => recipe.id === id);
  }

  let btnContinue = '';
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes !== null) {
    const { drinks } = inProgressRecipes;
    btnContinue = Object.keys(drinks).some((recipe) => recipe === id);
  }

  const { location } = useHistory();
  const handleClickShare = () => {
    setShareCopyBtn(true);
    copy(`http://localhost:3000${location.pathname}`);
  };

  const recipe = {
    id: drinkDetails.idDrink,
    type: 'drink',
    nationality: '',
    category: drinkDetails.strCategory,
    alcoholicOrNot: drinkDetails.strAlcoholic,
    name: drinkDetails.strDrink,
    image: drinkDetails.strDrinkThumb };

  const isFavorited = storageItem.filter((el) => el.id === recipe.id).length > 0;

  const handleFavoriteBtn = () => {
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
    <>
      <img
        data-testid="recipe-photo"
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
      />
      <h1 data-testid="recipe-title">{drinkDetails.strDrink}</h1>
      <h3 data-testid="recipe-category">{drinkDetails.strAlcoholic}</h3>
      <ol>
        <h6>Ingredients:</h6>
        { getIngredients().map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {item}
          </li>
        ))}
      </ol>
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>
      <div className="scroll">
        {recommendationMeals.length > 0 && recommendationMeals.map((meal, i) => (
          i < CARDS_MAXIMUM && (
            <div
              className="scroll-child"
              key={ meal.idMeal }
              data-testid={ `${i}-recommendation-card` }
            >
              <p
                className="scroll-p"
                data-testid={ `${i}-recommendation-title` }
              >
                { meal.strMeal }

              </p>
              <img
                className="scroll-img"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
            </div>
          )
        ))}
      </div>

      <button
        className="share-btn"
        type="button"
        data-testid="share-btn"
        onClick={ handleClickShare }
      >
        Compartilhar

      </button>

      { shareCopyBtn && (
        <p>
          Link copied!
        </p>
      ) }
      <img
        data-testid="favorite-btn"
        onClick={ handleFavoriteBtn }
        src={ isFavorited ? iconFavorited : iconNotFavorited }
        alt="Favoritar"
        role="presentation"
      />
      {btnDisappear === '' && (
        <button
          className="scroll-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        >
          {btnContinue ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}

    </>
  );
}

export default DrinkDetails;
