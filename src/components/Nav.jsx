import React from 'react';
import { Link } from 'react-router-dom';
import UIkit from 'uikit';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { getRoomName } from '../utils/url';

const Nav = ({ revealPointsAction, clearPointsAction, leaveRoomAction, copiedLinkAction }) => {
  const closeNav = () => {
    UIkit.offcanvas('#offcanvas-nav').hide();
  };

  const revealPoints = () => {
    revealPointsAction();
    closeNav();
  };

  const clearPoints = () => {
    clearPointsAction();
    closeNav();
  };

  const leaveRoom = () => {
    leaveRoomAction();
    closeNav();
  };

  const copyRoomLink = () => {
    const roomName = getRoomName();
    const url = `${window.location.origin}/join?roomName=${roomName}`;
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    copiedLinkAction();
    closeNav();
  };

  return (
    <div id="offcanvas-nav" uk-offcanvas="flip: true; overlay: true">
      <div className="uk-offcanvas-bar uk-flex uk-flex-column">
        <span className="uk-offcanvas-close" uk-icon="icon: close; ratio: 1.5" />
        <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
          <li onClick={revealPoints}>
            <VisibilityOutlinedIcon className="uk-margin-small-right" />
            Reveal Points
          </li>
          <li onClick={clearPoints}>
            <RemoveCircleOutlineIcon className="uk-margin-small-right" />
            Clear Points
          </li>
          <li onClick={copyRoomLink}>
            <FileCopyOutlinedIcon className="uk-margin-small-right" />
            Copy Room Link
          </li>
          <Link to="/">
            <li onClick={leaveRoom}>
              <ExitToAppIcon className="uk-margin-small-right" />
              Leave Room
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
