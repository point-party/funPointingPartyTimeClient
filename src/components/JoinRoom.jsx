import React, { Component } from 'react';

export class JoinRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      room: "",
      displayRoomName: "",
      observer: false,
    }
  }

  changeName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  changeRoom = (event) => {
    this.setState({
      room: event.target.value
    })
  }

  changeRole = (event) => {
    console.log('event', event)
    event.preventDefault()
    this.setState({
      observer: event.target.value
    })
  }

  joinRoom = () => {
    const { room, name, observer } = this.state
    if (room && name) {
      this.conn = new WebSocket(`ws://localhost:8080/joinRoom?room=${room}&name=${name}&observer=${observer}`)
      this.conn.addEventListener('message', function (e) {
        console.log('json', JSON.parse(e.data))
      })
    }
  }

  render() {
    const { room, name, observer } = this.state

    return (
      <div className="create-room-content">
        <h3>Join a Room</h3>
        <form className="uk-form-stacked">
          <div className="uk-margin">
            <label
              className="uk-form-label"
              htmlFor="form-stacked-text">
              Room #
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                id="form-stacked-text"
                type="text"
                value={room}
                onChange={this.changeRoom}
                placeholder="" />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label"
                   htmlFor="form-stacked-text">Name</label>
            <div className="uk-form-controls">
              <input className="uk-input"
                     id="form-stacked-text"
                     type="text"
                     value={name}
                     onChange={this.changeName}
                     placeholder="" />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label"
                   htmlFor="form-stacked-text">Role</label>
            <div
              className="uk-button-group uk-width-1-1">
              <button
                className={`uk-button-default uk-width-1-2 ${!observer ? 'uk-button' : 'uk-button uk-button-disabled' }`}
                value={false}
                onChange={this.changeRole}>
                Pointer
              </button>
              <button
                className={`uk-button-default uk-width-1-2 ${observer ? 'uk-button' : 'uk-button uk-button-disabled' }`}
                value={true}
                onChange={this.changeRole}>
                Observer
              </button>
            </div>
          </div>
          <div className="uk-margin">
            <button
              className="uk-button uk-button-primary uk-button-large  uk-width-1-1"
              disabled={!name || !room}
              onClick={this.joinRoom}>
              Join
            </button>
          </div>
        </form>
      </div>
    );
  }
}