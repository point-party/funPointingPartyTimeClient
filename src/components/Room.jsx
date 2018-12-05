import React, { Component } from 'react';
import UIkit from 'uikit';
import {
  JOIN_ROOM,
  VOTED,
  CLEAR_POINTS,
  REVEAL_POINTS,
  LEAVE_ROOM,
} from '../sockets/SocketConnection';
import { Nav } from './Nav';
import { Scale } from './Scale';
import { POINTER, OBSERVER } from '../constants/roles';
import { SIMPLE } from '../constants/scales';

export class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointers: [],
      observers: [],
      room: 'ABC123',
      showPoints: false,
      points: null,
      voted: false,
      view: POINTER, // TODO: default to player's own role
      scale: SIMPLE, // TODO: make this configurable/default to room's scale
    };
  }

  componentDidMount() {
    const { socketConnection } = this.props;
    if (socketConnection.conn) {
      socketConnection.conn.addEventListener('message', e => {
        const data = JSON.parse(e.data);
        this.decideAction(data);
      });
    } else {
      this.props.history.push('/');
    }
    this.decideAction = this.decideAction.bind(this);
  }

  componentWillUnmount() {
    const { socketConnection } = this.props;
    socketConnection.close();
  }

  toggleView = value => {
    this.setState({ view: value });
  };

  selectPoints = points => {
    this.setState({ points });
  };

  decideAction = data => {
    console.log('data', data);
    if (data.event === JOIN_ROOM || data.event === LEAVE_ROOM) {
      this.setState({ pointers: data.payload.players });
    }
    if (data.event === VOTED) {
      this.setState(prevState => ({
        ...prevState,
        pointers: updatePlayersPoints(prevState.pointers, data.payload),
      }));
    }
    if (data.event === CLEAR_POINTS) {
      triggerToast('Clearing Points!', 'success');
      this.setState(prevState => ({
        ...prevState,
        pointers: clearPlayersPoints(prevState.pointers),
        points: null,
        voted: false,
      }));
    }
    if (data.event === REVEAL_POINTS) {
      triggerToast('Revealing Points!', 'success');
      this.setState({ showPoints: true });
    }
  };

  vote = () => {
    const { socketConnection } = this.props;
    socketConnection.send(VOTED, this.state.points);
    this.setState(prevState => ({ voted: !prevState.voted }));
  };

  revealPoints = () => {
    const { socketConnection } = this.props;
    socketConnection.send(REVEAL_POINTS);
    this.setState({ showPoints: true });
  };

  clearPoints = () => {
    const { socketConnection } = this.props;
    socketConnection.send(CLEAR_POINTS);
    // not sure what the payload should be here, if any
    this.setState({ showPoints: false });
  };

  leaveRoom = () => {
    const { socketConnection } = this.props;
    socketConnection.close();
    this.props.history.push('/');
  };

  render() {
    const { showPoints, pointers, observers, points, voted, view, scale } = this.state;
    console.log('pointers', pointers);
    const pointersView = pointers.map(pointer => (
      <div className="pointer-row" key={pointer.id}>
        <span>{pointer.name}</span>
        <span>{showPoints ? pointer.point : pointer.point ? <span uk-icon="check" /> : ''}</span>
      </div>
    ));
    const observersView = observers.map(obs => (
      <div className="pointer-row" key={obs}>
        <span>{obs}</span>
      </div>
    ));

    return (
      <div className="room-content">
        <div className="room-content__top">
          <ul className="uk-child-width-expand" uk-tab="true">
            <li
              className={view === POINTER ? 'uk-active' : undefined}
              onClick={_ => this.toggleView(POINTER)}
            >
              <a href="">Pointers ({pointers.length})</a>
            </li>
            <li
              className={view === OBSERVER ? 'uk-active' : undefined}
              onClick={_ => this.toggleView(OBSERVER)}
            >
              <a href="">Observers ({observers.length})</a>
            </li>
          </ul>
          {view === POINTER ? pointersView : observersView}
        </div>

        <Scale voted={voted} points={points} scale={scale} selectPointsAction={this.selectPoints} />
        <div className="room-content__bottom">
          <button
            className="uk-button uk-button-default uk-button-large  uk-width-1-1"
            disabled={!points}
            onClick={this.vote}
          >
            {!voted ? 'Submit' : 'Change Vote'}
          </button>
        </div>
        <Nav
          revealPointsAction={this.revealPoints}
          clearPointsAction={this.clearPoints}
          leaveRoomAction={this.leaveRoom}
        />
      </div>
    );
  }
}

const updatePlayersPoints = (players, update) => {
  return players.map(player => {
    if (player.id === update.id) {
      player.point = update.point;
    }
    return player;
  });
};

const clearPlayersPoints = players => {
  return players.map(player => {
    return {
      ...player,
      point: '',
    };
  });
};

const triggerToast = (message, type) => {
  UIkit.notification({
    message,
    status: type,
    pos: 'top-center',
    timeout: 2000,
  });
};
