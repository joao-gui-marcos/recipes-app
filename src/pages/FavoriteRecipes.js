import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import iconFavorited from '../images/blackHeartIcon.svg';
import iconShare from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [shareCopyBtn, setShareCopyBtn] = useState(false);
  const history = useHistory();

  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    const getFavorites = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(favoriteRecipes);
    };
    getFavorites();
  }, []);

  const handleClickShare = (type, id) => {
    if (type === 'meal') {
      setShareCopyBtn(true);
      copy(`http://localhost:3000/meals/${id}`);
    } else {
      setShareCopyBtn(true);
      copy(`http://localhost:3000/drinks/${id}`);
    }
  };

  const handleFavoriteBtn = (id) => {
    const favs = favorites.filter((el) => el.id !== id);
    setFavorites(favs);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favs));
  };

  const handleImageTitle = (type, id) => {
    if (type === 'meal') {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  const filterByMeal = () => {
    const mealFilter = local.filter((el) => el.type === 'meal');
    setFavorites(mealFilter);
  };

  const filterByDrink = () => {
    const drinkFilter = local.filter((el) => el.type === 'drink');
    setFavorites(drinkFilter);
  };

  const allFavs = () => {
    setFavorites(local);
  };

  return (
    <>
      <Header title="Favorite Recipes" />

      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ allFavs }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ filterByMeal }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrink }
        >
          Drinks
        </button>
      </div>

      {favorites !== null && favorites.map((fav, index) => (
        <div key={ index }>
          <img
            src={ fav.image }
            onClick={ () => handleImageTitle(fav.type, fav.id) }
            alt={ fav.name }
            data-testid={ `${index}-horizontal-image` }
            role="presentation"
          />

          <h3
            data-testid={ `${index}-horizontal-name` }
            onClick={ () => handleImageTitle(fav.type, fav.id) }
            role="presentation"
          >
            {fav.name}
          </h3>

          {fav.type === 'meal' ? (

            <h6 data-testid={ `${index}-horizontal-top-text` }>
              {`${fav.nationality} - ${fav.category}`}
            </h6>

          ) : (

            <h6
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${fav.alcoholicOrNot} - ${fav.category}`}
            </h6>

          )}

          <div>
            <img
              src={ iconShare }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleClickShare(fav.type, fav.id) }
              alt="Share"
              role="presentation"
            />

            { shareCopyBtn && (
              <p>
                Link copied!
              </p>
            ) }

            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ iconFavorited }
              onClick={ () => handleFavoriteBtn(fav.id) }
              alt="Desfavoritar"
              role="presentation"
            />
          </div>

        </div>
      ))}

    </>
  );
}

export default FavoriteRecipes;
