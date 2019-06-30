import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiUrl } from '../utils/api';
import { SIMPLE, FIBONACCI, T_SHIRT } from '../constants/scales';
import { ROOM } from '../constants/routes';
import { changeRole } from '../appState/reducers/role';
import Role from './Role';

const API_URL = getApiUrl();

export class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: '',
      pointScale: SIMPLE,
    };
  }

  changeName = event => {
    this.setState({
      name: event.target.value,
    });
  };

  changeRoleAction = event => {
    const { changeRole } = this.props;
    event.stopPropagation();
    event.preventDefault();
    changeRole(event.target.value);
  };

  changeScale = event => {
    event.preventDefault();
    event.stopPropagation();
    console.log('event', event.target.value);
    this.setState({
      pointScale: event.target.value,
    });
  };

  joinRoom = (roomName, playerName) => {
    const { socketConnection, role } = this.props;
    socketConnection.joinRoom(roomName, playerName, role);
    this.props.history.push(`${ROOM}/${roomName}`);
  };

  createRoom = event => {
    event.preventDefault();
    const { name, pointScale } = this.state;
    const { role } = this.props;
    // edit backend to take in observer and name, and pointscale
    return fetch(`https://${API_URL}/generateRoom?pointScale=${pointScale}`)
      .then(res => res.json())
      .then(({ roomName }) => this.joinRoom(roomName, name, role));
  };

  render() {
    const { name } = this.state;
    const { role } = this.props;
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
            <Role changeRoleAction={this.changeRoleAction} role={role} />
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
                defaultValue={this.state.pointScale}
              >
                <option value={SIMPLE}>Simple (1, 2, 3)</option>
                <option value={FIBONACCI}>Modified Fibonacci (1, 2, 3, 5 ... 100)</option>
                <option value={T_SHIRT}>T-Shirt Sizes (XXS, XS ... XXL)</option>
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

export default connect(
  state => state,
  { changeRole }
)(CreateRoom);
