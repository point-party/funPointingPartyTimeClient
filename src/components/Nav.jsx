import React from 'react';
import { Link } from 'react-router-dom';
import UIkit from 'uikit';

import { ReactComponent as CloseIcon } from '../svg/close.svg';
import { ReactComponent as CopyIcon } from '../svg/copy.svg';
import { ReactComponent as EyeIcon } from '../svg/eye.svg';
import { ReactComponent as ReplayIcon } from '../svg/replay.svg';
import { ReactComponent as ExitIcon } from '../svg/exit.svg';
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
        <span />
        <CloseIcon title="close-nav-icon" className="icon icon--large uk-offcanvas-close" />
        <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
          <li onClick={revealPoints}>
            <EyeIcon title="reveal-points-icon" className="icon uk-margin-small-right" />
            Reveal Points
          </li>
          <li onClick={clearPoints}>
            <ReplayIcon title="new-round-icon" className="icon uk-margin-small-right" />
            New Round
          </li>
          <li onClick={copyRoomLink}>
            <CopyIcon title="copy-icon" className="icon uk-margin-small-right" />
            Copy Room Link
          </li>
          <Link to="/">
            <li onClick={leaveRoom}>
              <ExitIcon title="exit-icon" className="icon uk-margin-small-right" />
              Leave Room
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
