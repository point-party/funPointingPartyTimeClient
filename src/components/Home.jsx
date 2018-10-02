import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Home extends Component {
  render() {
    return (
      <div className="home-content">
        <p uk-margin>
          <Link to="/create">
            <button
              className="uk-button uk-button-default uk-button-large uk-width-1-1">
              Create New Room
            </button>
          </Link>
          <br />
          <Link to="/join">
            <button
              className="uk-button uk-button-default uk-button-large uk-width-1-1">
              Join Existing Room
            </button>
          </Link>
        </p>
      </div>
    );
  }
}