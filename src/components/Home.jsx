import React from 'react';
import { Link } from 'react-router-dom';
import { CREATE, JOIN } from '../constants/routes';

const Home = () => {
  return (
    <div className="home-content">
      <p className="uk-margin uk-width-1-1">
        <Link to={CREATE}>
          <button className="uk-button uk-button-default uk-button-large uk-width-1-1">
            Create New Room
          </button>
        </Link>
        <br />
        <Link to={JOIN}>
          <button className="uk-button uk-button-default uk-button-large uk-width-1-1">
            Join Existing Room
          </button>
        </Link>
      </p>
    </div>
  );
};

export default Home;
