import React from 'react';
import { Link } from "react-router-dom";
import UIkit from 'uikit';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const Nav = (props) => {
  const { revealPointsAction, clearPointsAction } = props

  const closeNav = () => {
    UIkit.offcanvas('#offcanvas-nav').hide()
  }

  const revealPoints = () => {
    revealPointsAction()
    closeNav()
  }

  const clearPoints = () => {
    clearPointsAction()
    closeNav()
  }

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
          <Link to="/">
            <li onClick={closeNav}>
              <ExitToAppIcon className="uk-margin-small-right" />
              Leave Room
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}