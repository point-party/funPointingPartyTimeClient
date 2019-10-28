import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';

import Form from './Form/Form';
import FormField from './Form/FormField';
import TextField from './Form/TextField';
import Button from './Form/Button';
import RoleToggle from './RoleToggle';
import { changeRole } from '../appState/reducers/role';
import { ROOM } from '../constants/routes';
import { getRoomNameFromQueryParams } from '../utils/url';

const JoinRoom = ({ changeRole, socketConnection, history, role }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState(getRoomNameFromQueryParams());
  const changeName = event => setName(event.target.value);
  const changeRoom = event => setRoom(event.target.value);

  const changeRoleAction = useCallback(
    event => {
      event.stopPropagation();
      event.preventDefault();
      changeRole(event.target.value);
    },
    [changeRole]
  );

  const joinRoom = event => {
    socketConnection.joinRoom(room.toUpperCase(), name, role);
    history.push(`${ROOM}/${room}`);
  };

  return (
    <div className="join-room">
      <Form id="join-room-form" title="Join a Room">
        <TextField
          fieldId="room-number"
          label="Room #"
          value={room}
          onChange={changeRoom}
          uppercase
          autoFocus
        />
        <TextField fieldId="user-name" label="Name" value={name} onChange={changeName} />
        <FormField fieldId="join-role" label="Role">
          <RoleToggle fieldId="join-role" onChangeAction={changeRoleAction} role={role} />
        </FormField>
        <Button id="join-room-submit" type="submit" disabled={!name || !room} onClick={joinRoom}>
          Join
        </Button>
      </Form>
    </div>
  );
};

export default connect(
  state => state,
  { changeRole }
)(JoinRoom);
