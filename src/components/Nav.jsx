import React, { Component } from 'react';

export class Nav extends Component {
  render() {
    return (
      <div id="offcanvas-nav" uk-offcanvas="flip: true; overlay: true">
        <div className="uk-offcanvas-bar uk-flex uk-flex-column">
          <span className="uk-offcanvas-close" uk-icon="icon: close; ratio: 1.5" uk-close="true"></span>
          <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
            <li className="uk-nav-header">Points</li>
            <li><a href=""><span className="uk-margin-small-right" uk-icon="icon: warning"></span> Reveal</a></li>
            <li><a href=""><span className="uk-margin-small-right" uk-icon="icon: trash"></span> Reset</a></li>
            <li className="uk-nav-header">Room</li>
            <li><a href=""><span className="uk-margin-small-right" uk-icon="icon: copy"></span> Invite</a></li>
            <li><a href=""><span className="uk-margin-small-right" uk-icon="icon: sign-out"></span>Leave</a></li>
          </ul>
        </div>
      </div>
    );
  }
}