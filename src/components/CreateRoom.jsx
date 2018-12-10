import React, { Component } from 'react';
import { getApiUrl } from '../utils/api';
import { SIMPLE, FIBONACCI, TSHIRT } from '../constants/scales';
import { Role } from './Role';

const API_URL = getApiUrl();

export class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: '',
      observer: 'false', // TODO: can we change this key to "role" and pass a string from constants/roles?
      scale: SIMPLE,
    };
  }

  changeName = event => {
    this.setState({
      name: event.target.value,
    });
  };

  changeRole = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      observer: event.target.value,
    });
  };

  changeScale = event => {
    this.setState({
      scale: event.target.value,
    });
  };

  joinRoom = (roomName, playerName, observer) => {
    const { socketConnection } = this.props;
    socketConnection.joinRoom(roomName, playerName, observer);
    this.props.history.push(`/room/${roomName}?observer=${observer}`);
  };

  createRoom = event => {
    event.preventDefault();
    const { name, observer } = this.state;
    // edit backend to take in observer and name, and pointscale
    return fetch(`https://${API_URL}/generateRoom?observer=${observer}&name=${name}`)
      .then(res => res.json())
      .then(({ roomName }) => this.joinRoom(roomName, name, observer));
  };

  render() {
    const { name, observer } = this.state;
    return (
      <div className="create-room-content">
        <h3>Create a Room</h3>
        <form autoComplete="off" className="uk-form-stacked">
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Name
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                id="form-stacked-text"
                type="text"
                value={name}
                onChange={this.changeName}
                placeholder=""
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Role
            </label>
            <Role changeRoleAction={this.changeRole} observer={observer} />
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-stacked-select">
              Point Scale
            </label>
            <div className="uk-form-controls">
              <select
                className="uk-select"
                id="form-stacked-select"
                onChange={this.changeScale}
                defaultValue={SIMPLE}
              >
                <option value={SIMPLE}>Simple (1, 2, 3)</option>
                <option disabled value={FIBONACCI}>
                  Modified Fibonacci (1, 2, 3, 5 ... 100)
                </option>
                <option disabled value={TSHIRT}>
                  T-Shirt Sizes (XXS, XS ... XXL)
                </option>
              </select>
            </div>
          </div>
          <div className="uk-margin">
            <button
              className="uk-button uk-button-default uk-button-large uk-width-1-1"
              disabled={!name}
              onClick={this.createRoom}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}
