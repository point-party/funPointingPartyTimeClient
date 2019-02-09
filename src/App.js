import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Home } from './components/Home';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Room from './components/Room';
import { Header } from './components/Header';
import SocketConnection from './sockets/SocketConnection';
import { CREATE, JOIN, ROOM } from './constants/routes';
import './App.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { getApiUrl } from './utils/api';
const API_URL = getApiUrl();
UIkit.use(Icons);

export default class App extends Component {
  constructor() {
    super();
    this.state = { socketConnection: new SocketConnection() };
  }

  componentWillMount() {
    return fetch(`https://${API_URL}/wakeup`).then(() => console.log('server is awake'));
  }

  render() {
    const { socketConnection } = this.state;
    return (
      <Router>
        <div className="app-container uk-offcanvas-content">
          <Header />
          <main>
            <div className="app-content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  path={JOIN}
                  render={props => <JoinRoom {...props} socketConnection={socketConnection} />}
                />
                <Route
                  path={CREATE}
                  render={props => <CreateRoom {...props} socketConnection={socketConnection} />}
                />
                <Route
                  path={ROOM}
                  render={props => <Room {...props} socketConnection={socketConnection} />}
                />
                <Redirect to="/" />
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}
