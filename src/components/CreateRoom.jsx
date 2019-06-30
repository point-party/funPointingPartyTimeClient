import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { getApiUrl } from '../utils/api';
import { SIMPLE, FIBONACCI, T_SHIRT } from '../constants/scales';
import { ROOM } from '../constants/routes';
import { changeRole } from '../appState/reducers/role';
import Role from './Role';
import Form from './Form/Form';
import FormField from './Form/FormField';
import TextField from './Form/TextField';
import SubmitButton from './Form/SubmitButton';

const API_URL = getApiUrl();

const CreateRoom = ({ changeRole, socketConnection, role, history }) => {
  const [name, setName] = useState('');
  const [scale, setScale] = useState(SIMPLE);
  const changeName = event => setName(event.target.value);

  const changeScale = event => {
    event.preventDefault();
    event.stopPropagation();
    console.log('event', event.target.value);
    setScale(event.target.value);
  };

  const changeRoleAction = useCallback(
    event => {
      event.stopPropagation();
      event.preventDefault();
      changeRole(event.target.value);
    },
    [changeRole]
  );

  const joinRoom = useCallback(
    (room, name) => {
      socketConnection.joinRoom(room, name, role);
      history.push(`${ROOM}/${room}`);
    },
    [socketConnection, history, role]
  );

  const createRoom = event => {
    event.preventDefault();
    // edit backend to take in observer and name, and pointscale
    return fetch(`https://${API_URL}/generateRoom?pointScale=${scale}`)
      .then(res => res.json())
      .then(({ roomName: room }) => joinRoom(room, name, role));
  };

  return (
    <div className="create-room-content">
      <Form id="create-room-form" title="Create a Room">
        <TextField id="create-name" label="Name" value={name} onChange={changeName} />
        <FormField id="create-role" label="Role">
          <Role id="create-role" changeRoleAction={changeRoleAction} role={role} />
        </FormField>
        <FormField id="create-scale" label="Point Scale">
          <select
            className="uk-select"
            id="create-scale"
            onChange={changeScale}
            defaultValue={scale}
          >
            <option value={SIMPLE}>Simple (1, 2, 3)</option>
            <option value={FIBONACCI}>Modified Fibonacci (1, 2, 3, 5 ... 100)</option>
            <option value={T_SHIRT}>T-Shirt Sizes (XXS, XS ... XXL)</option>
          </select>
        </FormField>
        <SubmitButton id="create-room-submit" text="Create" disabled={!name} onClick={createRoom} />
      </Form>
    </div>
  );
};

export default connect(
  state => state,
  { changeRole }
)(CreateRoom);
