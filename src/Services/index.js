const apiNotFound = 'API endpoint not found';

const filterUrl = (input, radio) => {
  let url = '';
  if (radio === 'ingrediente') {
    url = `filter.php?i=${input}`;
  }
  if (radio === 'nome') {
    url = `search.php?s=${input}`;
  }
  if (radio === 'primeira-letra') {
    url = `search.php?f=${input}`;
  }
  return url;
};

const fetchMeals = async (input, radio) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/';
  try {
    const response = await fetch(`${url}${filterUrl(input, radio)}`);
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    console.log(apiNotFound);
  }
};

const fetchDrinks = async (input, radio) => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/';
  try {
    const response = await fetch(`${url}${filterUrl(input, radio)}`);
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    console.log(apiNotFound);
  }
};

export { fetchMeals, fetchDrinks };
