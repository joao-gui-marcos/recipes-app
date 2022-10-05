import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecipeCard({ name, image, index, id, meal = true }) {
  const history = useHistory();
  const redirectToDetails = () => {
    if (meal) {
      history.push(`/meals/${id}`);
    }
    if (!meal) {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <button type="button" onClick={ redirectToDetails }>
      <img
        alt="meal-thumbnail"
        src={ image }
        width="200"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </button>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  meal: PropTypes.bool.isRequired,
};

export default RecipeCard;
