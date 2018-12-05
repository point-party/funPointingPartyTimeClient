import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRoomName } from '../utils/url';

export class Header extends Component {
  render() {
    const { pathname } = window.location;
    const roomName = getRoomName();
    const backArrow =
      pathname !== '/' ? (
        <Link to="/">
          <span uk-icon="icon: arrow-left; ratio: 1.5" />
        </Link>
      ) : (
        <span />
      );
    const hamburgerMenu =
      pathname !== '/' && pathname !== '/create' ? (
        <span uk-toggle="target: #offcanvas-nav" uk-icon="icon: menu; ratio: 1.5" />
      ) : (
        <span />
      );

    return (
      <header>
        {backArrow}
        <h2>{roomName ? `Room: ${roomName}` : `Point It`}</h2>
        {hamburgerMenu}
      </header>
    );
  }
}
