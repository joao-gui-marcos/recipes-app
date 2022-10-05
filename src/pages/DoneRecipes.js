import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import share from '../images/shareIcon.svg';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [shareCopyBtn, setShareCopyBtn] = useState(false);
  const history = useHistory();

  const local = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    const getDone = () => {
      const done = local;
      setDoneRecipes(done);
    };
    getDone();
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

  const filterByMeal = () => {
    const mealFilter = local.filter((el) => el.type === 'meal');
    setDoneRecipes(mealFilter);
  };
  const filterByDrink = () => {
    const drinkFilter = local.filter((el) => el.type === 'drink');
    setDoneRecipes(drinkFilter);
  };
  const allFavs = () => {
    const allRecipes = local;
    setDoneRecipes(allRecipes);
  };

  const handleImageTitle = (type, id) => {
    if (type === 'meal') {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <>
      <Header title="Done Recipes" />
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

      { doneRecipes !== null && doneRecipes.map((el, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ el.image }
            alt={ el.name }
            onClick={ () => handleImageTitle(el.type, el.id) }
            role="presentation"
          />

          <h6
            data-testid={ `${index}-horizontal-name` }
            onClick={ () => handleImageTitle(el.type, el.id) }
            role="presentation"
          >
            {el.name }
          </h6>
          {el.type === 'meal' ? (
            <div>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${el.nationality} - ${el.category}`}
              </p>

            </div>
          ) : (
            <div>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {el.alcoholicOrNot}
              </p>

            </div>
          )}

          <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>

          {el.tags !== null
          && (
            <div>
              <p data-testid={ `${index}-${el.tags[0]}-horizontal-tag` }>
                {el.tags[0]}
              </p>
              <p data-testid={ `${index}-${el.tags[1]}-horizontal-tag` }>
                {el.tags[1]}
              </p>
            </div>)}
          <img
            src={ share }
            alt={ el.name }
            data-testid={ `${index}-horizontal-share-btn` }
            role="presentation"
            onClick={ () => handleClickShare(el.type, el.id) }
          />
          { shareCopyBtn && (
            <p>
              Link copied!
            </p>
          ) }
        </div>
      ))}

    </>
  );
}

export default DoneRecipes;
