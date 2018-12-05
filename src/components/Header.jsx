import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRoomName } from '../utils/url';
import { ROOM } from '../constants/routes'

export class Header extends Component {
  render() {
    const { pathname } = window.location;
    const isInRoom = pathname.includes(ROOM);
    let roomName = isInRoom ? `Room: ${getRoomName()}` : 'Point It';

    const backArrow =
      pathname !== '/' ? (
        <Link to="/">
          <span uk-icon="icon: arrow-left; ratio: 1.5" />
        </Link>
      ) : (
        <span />
      );
    const hamburgerMenu =
      isInRoom ? (
        <span uk-toggle="target: #offcanvas-nav" uk-icon="icon: menu; ratio: 1.5" />
      ) : (
        <span />
      );

    return (
      <header>
        {backArrow}
        <h2>{roomName}</h2>
        {hamburgerMenu}
      </header>
    );
  }
}
