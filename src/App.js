import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/MyProvider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Footer from './components/Footer';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import DrinkDetails from './pages/DrinkDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/meals"
          render={ (props) => (
            <div>
              <Meals />
              <Recipes { ...props } key={ window.location.pathname } />
              <Footer />
            </div>) }
        />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route
          exact
          path="/drinks"
          render={ (props) => (
            <div>
              <Drinks />
              <Recipes { ...props } key={ window.location.pathname } />
              <Footer />
            </div>) }
        />
        <Route exact path="/drinks/:id" component={ DrinkDetails } />
        <Route
          exact
          path="/profile"
          render={ () => (
            <div>
              <Profile />
              <Footer />
            </div>) }
        />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/meals/{id-da-receita}" />
        <Route exact path="/drinks/{id-da-receita}" />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ (props) => (
            <div>
              <RecipeInProgress { ...props } key={ window.location.pathname } />
            </div>) }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => (
            <div>
              <RecipeInProgress key={ window.location.pathname } { ...props } />
            </div>) }
        />
      </Switch>
    </Provider>
  );
}

export default App;
