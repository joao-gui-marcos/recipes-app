import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [loading, setLoading] = useState(null);
  const [inputSearchBar, setInputSearchBar] = useState('');
  const [mealsRecipes, setMealsRecipes] = useState('');
  const [drinksRecipes, setDrinksRecipes] = useState('');
  const [recommendationMeals, setRecommendationMeals] = useState([]);
  const [recommendationDrinks, setRecommendationDrinks] = useState([]);

  const context = {
    loading,
    setLoading,
    inputSearchBar,
    setInputSearchBar,
    mealsRecipes,
    setMealsRecipes,
    drinksRecipes,
    setDrinksRecipes,
    recommendationDrinks,
    setRecommendationDrinks,
    recommendationMeals,
    setRecommendationMeals,
  };

  return (
    <main>
      <MyContext.Provider value={ context }>
        { children }
      </MyContext.Provider>
    </main>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
