import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './components/Home';
import { CreateRoom } from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import { Room } from './components/Room';
import { Header } from './components/Header';
import SocketConnection from './sockets/SocketConnection';
import './App.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);

class App extends Component {
  constructor() {
    super();
    this.state = { socketConnection: new SocketConnection() };
  }

  componentWillMount() {
    return fetch('http://localhost:8080/wakeup').then(() => console.log('server is awake'));
  }

  render() {
    console.log('this.state.socketConnection', this.state.socketConnection);
    return (
      <Router>
        <div className="app-container uk-offcanvas-content">
          <Header />
          <main>
            <div className="app-content">
              <Route exact path="/" component={Home} />
              <Route
                path="/join"
                render={props => (
                  <JoinRoom {...props} socketConnection={this.state.socketConnection} />
                )}
              />
              <Route
                path="/create"
                render={props => (
                  <CreateRoom {...props} socketConnection={this.state.socketConnection} />
                )}
              />
              <Route
                path="/room"
                render={props => <Room {...props} socketConnection={this.state.socketConnection} />}
              />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
