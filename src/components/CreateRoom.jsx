import React, { Component, Fragment } from 'react';

export class CreateRoom extends Component {
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

  changeRole = (event) => {
    event.preventDefault()
    this.setState({
      observer: event.target.value
    })
  }

  // Currently linked to create room ->  this should be createRoom.
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
      <Fragment>
        <h3>Create a Room</h3>
        <form className="uk-form-stacked">
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
                onClick={this.changeRole}>
                Pointer
              </button>
              <button
                className={`uk-button-default uk-width-1-2 ${observer ? 'uk-button' : 'uk-button uk-button-disabled' }`}
                value={true}
                onClick={this.changeRole}>
                Observer
              </button>
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-stacked-select">Point Scale</label>
            <div className="uk-form-controls">
              <select className="uk-select" id="form-stacked-select">
                <option disabled defaultValue="simple" value />
                <option key="simple">Simple (0, 1, 2, 3)</option>
                <option key="fib">Modified Fibonacci (0, ½, 1, 2 ... 100)</option>
                <option key="tshirt">T-Shirt Sizes (XXS, XS ... XXL)</option>
                <option>Custom...</option>
              </select>
            </div>
          </div>
          <div className="uk-margin">
            <button
              className="uk-button uk-button-primary uk-button-large  uk-width-1-1"
              disabled={!name || !room}
              onClick={this.joinRoom}>
              Create
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}