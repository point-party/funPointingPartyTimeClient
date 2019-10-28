import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import Home from './components/Home';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Room from './components/Room';
import Header from './components/Header';
import SocketConnection from './sockets/SocketConnection';
import { HOME, CREATE, JOIN, ROOM } from './constants/routes';
import { getApiUrl } from './utils/api';
import './App.css';

UIkit.use(Icons);
const API_URL = getApiUrl();
const socketConnection = new SocketConnection();

const App = () => {
  useEffect(() => {
    (async function wakeUpServer() {
      await fetch(`https://${API_URL}/wakeup`);
    })();
  }, []);

  return (
    <Router>
      <div className="app-container uk-offcanvas-content">
        <Header />
        <main>
          <div className="app-content">
            <Switch>
              <Route exact path={HOME} component={Home} />
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
};

export default App;
