import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { VOTED, CLEAR_POINTS, REVEAL_POINTS } from '../sockets/SocketConnection';
import { POINTER } from '../constants/roles';
import { successToast } from '../utils/toasts';
import Ballot from './Ballot';
import Nav from './Nav';
import Button from './Form/Button';
import RoleToggle from './RoleToggle';
import ParticipantRow from './ParticipantRow';
import useSocketMessageReducer from './useSocketMessageReducer';

const Room = ({ socketConnection, history, role }) => {
  const [pointSelection, setPointSelection] = useState(null);
  const [view, setView] = useState(POINTER);
  const [sheetVisibility, setSheetVisibility] = useState(false);
  const voted = pointSelection !== null;

  const { dispatch, pointers, observers, pointScale, showPoints } = useSocketMessageReducer();

  const changeViewAction = event => setView(event.target.value);
  const toggleSheetVisibility = () => setSheetVisibility(prevState => !prevState);
  const voteAction = value => {
    socketConnection.send(VOTED, value);
    setPointSelection(value);
  };
  const revealPoints = () => {
    socketConnection.send(REVEAL_POINTS);
    dispatch({ event: REVEAL_POINTS });
  };
  const clearPoints = () => {
    socketConnection.send(CLEAR_POINTS);
    dispatch({ event: CLEAR_POINTS });
  };
  const copiedLink = () => successToast('Copied Link!');
  const leaveRoom = () => history.push('/');

  useEffect(() => {
    if (socketConnection.conn) {
      socketConnection.conn.addEventListener('message', e => {
        const data = JSON.parse(e.data);
        dispatch(data);
      });
    } else {
      history.push('/');
    }

    return () => {
      socketConnection.close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pointersList = pointers.map(participant => (
    <ParticipantRow
      key={participant.id}
      view={view}
      participant={participant}
      isSelf={socketConnection.id === participant.id}
      showPoints={showPoints}
    />
  ));
  const observersList = observers.map(participant => (
    <ParticipantRow
      key={participant.id}
      view={view}
      participant={participant}
      isSelf={socketConnection.id === participant.id}
      showPoints={showPoints}
    />
  ));

  return (
    <div className="room-content">
      <RoleToggle
        onChangeAction={changeViewAction}
        role={view}
        pointers={pointers}
        observers={observers}
      />
      <div className="room-content__participant-list">
        {view === POINTER ? pointersList : observersList}
      </div>
      {role === POINTER && (
        <Button id="change-vote-button" onClick={toggleSheetVisibility} className="btn--large">
          {voted ? 'Change Vote' : 'Vote'}
        </Button>
      )}
      <Ballot
        visible={sheetVisibility}
        toggleSheetVisibility={toggleSheetVisibility}
        pointScale={pointScale}
        pointSelection={pointSelection}
        voteAction={voteAction}
      />
      <Nav
        revealPointsAction={revealPoints}
        clearPointsAction={clearPoints}
        leaveRoomAction={leaveRoom}
        copiedLinkAction={copiedLink}
      />
    </div>
  );
};

export default connect(
  state => state,
  {}
)(Room);
