import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoomNameFromQueryParams } from '../utils/url';
import { Role } from './Role';
import { changeRole } from '../appState/reducers/role';

export class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: getRoomNameFromQueryParams(),
      observer: 'false',
    };
  }

  joinRoom = () => {
    const { room, name } = this.state;
    const { socketConnection, history, role } = this.props;
    socketConnection.joinRoom(room.toUpperCase(), name, role);
    history.push(`/room/${room}`);
  };

  changeName = event => {
    this.setState({
      name: event.target.value,
    });
  };

  changeRoomName = event => {
    this.setState({
      room: event.target.value,
    });
  };

  changeRoleAction = event => {
    const { changeRole } = this.props;
    event.stopPropagation();
    event.preventDefault();
    changeRole(event.target.value);
  };

  render() {
    const { name, room } = this.state;
    const { role } = this.props;
    return (
      <div className="create-room-content">
        <h3>Join a Room</h3>
        <form className="uk-form-stacked">
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Room #
            </label>
            <div className="uk-form-controls">
              <input
                value={room}
                className="uk-input room-name-input"
                id="form-stacked-text"
                type="text"
                placeholder=""
                onChange={this.changeRoomName}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Name
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                value={name}
                id="form-stacked-text"
                type="text"
                placeholder=""
                onChange={this.changeName}
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
            <button
              className="uk-button uk-button-default uk-button-large  uk-width-1-1"
              disabled={!name || !room}
              onClick={this.joinRoom}
            >
              Join
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
)(JoinRoom);
