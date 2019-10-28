import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { ReactComponent as BackIcon } from '../svg/back.svg';
import { ReactComponent as MenuIcon } from '../svg/menu.svg';
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
      <BackIcon title="back-button" className="icon" />
    </Link>
  );
  const hamburgerMenu = (
    <MenuIcon
      title="open-menu-button"
      className="icon icon--large"
      uk-toggle="target: #offcanvas-nav"
    />
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
