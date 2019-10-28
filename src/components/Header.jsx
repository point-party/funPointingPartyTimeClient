import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { getRoomName } from '../utils/url';
import { HOME, ROOM, CREATE, JOIN } from '../constants/routes';

const Header = ({ location }) => {
  const { pathname } = location;
  const isInRoom = pathname.includes(ROOM);
  const isInCreate = pathname.includes(CREATE);
  const isInJoin = pathname.includes(JOIN);
  const roomName = isInRoom ? `Room: ${getRoomName()}` : 'Point It!';

  const backArrow = (
    <Link to={HOME}>
      <span uk-icon="icon: arrow-left; ratio: 1.5" />
    </Link>
  );
  const hamburgerMenu = (
    <span uk-toggle="target: #offcanvas-nav" uk-icon="icon: menu; ratio: 1.5" />
  );

  return (
    <header>
      {isInCreate || isInJoin ? backArrow : <span />}
      <h2>{roomName}</h2>
      {isInRoom ? hamburgerMenu : <span />}
    </header>
  );
};

export default withRouter(Header);
