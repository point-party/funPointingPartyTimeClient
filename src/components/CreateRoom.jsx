import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import RoleToggle from './RoleToggle';
import Form from './Form/Form';
import FormField from './Form/FormField';
import TextField from './Form/TextField';
import Button from './Form/Button';
import { getApiUrl } from '../utils/api';
import { SCALES, SIMPLE } from '../constants/scales';
import { ROOM } from '../constants/routes';
import { changeRole } from '../appState/reducers/role';

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
    <div className="create-room">
      <Form id="create-room-form" title="Create a Room">
        <TextField fieldId="user-name" label="Name" value={name} onChange={changeName} autoFocus />
        <FormField fieldId="create-role" label="Role">
          <RoleToggle fieldId="create-role" onChangeAction={changeRoleAction} role={role} />
        </FormField>
        <FormField fieldId="create-scale" label="Point Scale">
          <select id="create-scale" onChange={changeScale} defaultValue={scale}>
            {Object.entries(SCALES).map(([scale, { displayName }]) => (
              <option key={scale} value={scale}>
                {displayName}
              </option>
            ))}
          </select>
        </FormField>
        <Button id="create-room-submit" type="submit" disabled={!name} onClick={createRoom}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default connect(
  state => state,
  { changeRole }
)(CreateRoom);
