import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <header>
        {window.location.pathname !== '/' ?
          <Link to='/'>
            <span uk-icon="icon: arrow-left; ratio: 1.5"></span>
          </Link> : <span />}
        <h2>Point It</h2>
        <span uk-toggle="target: #offcanvas-nav" uk-icon="icon: menu; ratio: 1.5"></span>
      </header>
    );
  }
}