import React, { useState } from 'react';
import { getRoomNameFromQueryParams } from '../utils/url';
import { Role } from './Role';

export default function JoinRoom({ socketConnection, history }) {
  const prefilledRoomName = getRoomNameFromQueryParams();
  const name = useFormInput('');
  const room = useFormInput(prefilledRoomName);
  const isObserver = useFormInput('false');

  const joinRoom = () => {
    socketConnection.joinRoom(room.value, name.value, isObserver.value);
    history.push(`/room/${room.value}?observer=${isObserver.value}`);
  };

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
              {...room}
              className="uk-input"
              id="form-stacked-text"
              type="text"
              placeholder=""
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
              {...name}
              id="form-stacked-text"
              type="text"
              placeholder=""
            />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="form-stacked-text">
            Role
          </label>
          <Role changeRoleAction={isObserver.onChange} observer={isObserver.value} />
        </div>
        <div className="uk-margin">
          <button
            className="uk-button uk-button-default uk-button-large  uk-width-1-1"
            disabled={!name.value || !room.value}
            onClick={joinRoom}
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = event => {
    event.preventDefault();
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
}
