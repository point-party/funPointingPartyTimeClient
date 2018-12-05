import React, { useState } from 'react';
import { getRoomNameFromQueryParams } from '../utils/url';

export default function JoinRoom({ socketConnection, history }) {
  const prefilledRoomName = getRoomNameFromQueryParams();
  const name = useFormInput('');
  const room = useFormInput(prefilledRoomName);
  const isObserver = useFormInput('false');

  const joinRoom = () => {
    socketConnection.joinRoom(room.value, name.value, isObserver.value);
    history.push(`/room/${room.value}`);
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
          <div className="uk-button-group uk-width-1-1">
            <button
              className={`uk-button-default uk-width-1-2 ${
                isObserver.value === 'false' ? 'uk-button' : 'uk-button uk-button-disabled'
              }`}
              value={false}
              onClick={isObserver.onChange}
            >
              Pointer
            </button>
            <button
              className={`uk-button-default uk-width-1-2 ${
                isObserver.value === 'true' ? 'uk-button' : 'uk-button uk-button-disabled'
              }`}
              value={true}
              onClick={isObserver.onChange}
            >
              Observer
            </button>
          </div>
        </div>
        <div className="uk-margin">
          <button
            className="uk-button uk-button-primary uk-button-large  uk-width-1-1"
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
