import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || '';
  return (
    <>
      <Header title="Profile" />
      <p data-testid="profile-email">{user.email}</p>

      <Link to="/done-recipes">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>
      </Link>

      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>

      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Logout
        </button>
      </Link>
    </>
  );
}

export default Profile;
