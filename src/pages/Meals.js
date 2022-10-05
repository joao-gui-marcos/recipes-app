import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Meals() {
  const { mealsRecipes } = useContext(MyContext);

  const CARDS_MAXIMUM = 12;

  return (
    <div>
      <Header title="Meals" search />
      {mealsRecipes.length > 0 && mealsRecipes.map((meals, i) => (
        i < CARDS_MAXIMUM && (
          <div key={ meals.idMeal } data-testid={ `${i}-recipe-card` }>
            <p data-testid={ `${i}-card-name` }>{ meals.strMeal }</p>
            <img
              src={ meals.strMealThumb }
              alt={ meals.strMeal }
              data-testid={ `${i}-card-img` }
            />
          </div>
        )
      ))}
    </div>
  );
}

export default Meals;
