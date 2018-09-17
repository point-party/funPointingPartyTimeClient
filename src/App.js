import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      roomName: "",
      displayRoomName: "",
      observer: false,
    }
  }

  changeName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  toggleObserver = () => {
    const { observer } = this.state
    this.setState({
      observer: !observer
    })
  }

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

  createRoom = () => {
    return fetch('http://localhost:8080/generateRoom')
      .then(res => res.json())
      .then(({ roomName }) => this.setState({ displayRoomName: roomName }))
  }

  enterRoomName = (event) => {
    this.setState({ roomName: event.target.value })
  }

  joinRoom = () => {
    const { roomName, name, observer } = this.state
    if (roomName && name) {
      this.conn = new WebSocket(`ws://localhost:8080/joinRoom?room=${roomName}&name=${name}&observer=${observer}`)
      this.conn.addEventListener('message', function (e) {
        console.log('json', JSON.parse(e.data))
      })
    }
  }



  componentWillMount() {
    return fetch('http://localhost:8080/wakeup').then(() => console.log('server is awake'))
  }

  render() {
    const { roomName, name } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.displayRoomName ? `Room name: ${this.state.displayRoomName}` : ''}</h1>
        </header>
        <div className="layout">
        <div className="content">
          <div>
            <Button color="primary" onClick={() => this.createRoom()}>Create Room</Button>
          </div>
            <div className="inputRow">
              <label htmlFor="roomName">
                Enter Room Name
              </label>
            <input id="roomName" type="text" name="message" value={roomName} onChange={this.enterRoomName} />
              <Button color="primary" disabled={!roomName || !name} onClick={() => this.joinRoom()}>Join Room</Button>
            </div>
            <div className="inputRow">
            <label htmlFor="name">
              Name
            </label>
            <input id="name" type="text" name="message" value={name} onChange={this.changeName} />
            </div>
            <div className="inputRow">
            <label htmlFor="observer">
              Observer
            <input id="observer" onClick={this.toggleObserver} type="checkbox" name="observer" />
            </label>
            </div>
            <div className="inputRow">
            <Button color="primary" label="Submit" onClick={() => this.sendStuff()}>Send Json</Button>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

export default App;
