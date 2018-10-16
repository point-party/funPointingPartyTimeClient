import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    const { pathname } = window.location
    return (
      <header>
        {pathname !== '/' ?
          <Link to='/'>
            <span uk-icon="icon: arrow-left; ratio: 1.5" />
          </Link> : <span />}
        <h2>Point It</h2>
        {pathname !== '/' && pathname !== '/create' ?
            <span uk-toggle="target: #offcanvas-nav" uk-icon="icon: menu; ratio: 1.5" /> : <span />}
      </header>
    );
  }
}