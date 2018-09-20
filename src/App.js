import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './components/Home';
import { CreateRoom } from './components/CreateRoom';
import { JoinRoom } from './components/JoinRoom';
import { Nav } from './components/Nav';
import { Header } from './components/Header';
import './App.css';
// import Button from '@material-ui/core/Button';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// UIkit.notification('Hello world.');

class App extends Component {
  sendStuff = () => {
    const example = {
      event: "Something",
      name: this.state.name,
      point: 1
    }
    const messageToSend = JSON.stringify(example)
    console.log('messageToSend', messageToSend)
    this.conn.send(messageToSend)
  }

  componentWillMount() {
    return fetch('http://localhost:8080/wakeup').then(() => console.log('server is awake'))
  }

  render() {
    return (
      <Router>
        <div className="app-container uk-offcanvas-content">
          <Header />
          <main>
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route path="/join" component={JoinRoom} />
              <Route path="/create" component={CreateRoom} />
            </div>
            <Nav />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
