import React, { Component } from 'react';

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
    console.log('event', event)
    event.stopPropagation()
    event.preventDefault()
    this.setState({
      observer: event.target.value
    })
  }

  createRoom = (event) => {
    event.preventDefault()
    const { name, observer } = this.state
        // edit backend to take in observer and name, and pointscale
        return fetch(`http://localhost:8080/generateRoom?observer=${observer}&name=${name}`)
          .then(res => res.json())
          .then(({ roomName }) => this.setState({ displayRoomName: roomName }))
          // probably redirect to room at this point.
  }

  render() {
    const { name, observer } = this.state

    return (
      <div className="create-room-content">
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
              <select className="uk-select" id="form-stacked-select" defaultValue={0}>
                <option disabled value={0} />
                <option value={1}>Simple (0, 1, 2, 3)</option>
                <option value={2}>Modified Fibonacci (0, ½, 1, 2 ... 100)</option>
                <option value={3}>T-Shirt Sizes (XXS, XS ... XXL)</option>
                <option disabled>Custom... (coming soon)</option>
              </select>
            </div>
          </div>
          <div className="uk-margin">
            <button
              className="uk-button uk-button-primary uk-button-large  uk-width-1-1"
              disabled={!name}
              onClick={this.createRoom}>
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}