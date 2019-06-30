import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { ROOM } from '../constants/routes';
import { getRoomNameFromQueryParams } from '../utils/url';
import { changeRole } from '../appState/reducers/role';
import Role from './Role';
import Form from './Form/Form';
import FormField from './Form/FormField';
import TextField from './Form/TextField';
import SubmitButton from './Form/SubmitButton';

const JoinRoom = ({ changeRole, role }) => {
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

  const joinRoom = () => {
    const { room, name } = this.state;
    const { socketConnection, history, role } = this.props;
    socketConnection.joinRoom(room.toUpperCase(), name, role);
    history.push(`${ROOM}/${room}`);
  };

  return (
    <div className="join-room-content">
      <Form id="join-room-form" title="Join a Room">
        <TextField label="Room #" value={room} onChange={changeRoom} uppercase />
        <TextField label="Name" value={name} onChange={changeName} />
        <FormField id="join-role" label="Role">
          <Role id="join-role" changeRoleAction={changeRoleAction} role={role} />
        </FormField>
        <SubmitButton
          id="join-room-submit"
          text="Join"
          disabled={!name || !room}
          onClick={joinRoom}
        />
      </Form>
    </div>
  );
};

export default connect(
  state => state,
  { changeRole }
)(JoinRoom);
