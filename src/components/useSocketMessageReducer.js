import { useReducer } from 'react';

import {
  JOIN_ROOM,
  VOTED,
  CLEAR_POINTS,
  REVEAL_POINTS,
  LEAVE_ROOM,
} from '../sockets/SocketConnection';

const updatePlayersPoints = (players, update) =>
  players.map(player => {
    if (player.id === update.id) {
      player.point = update.point;
    }
    return player;
  });

const clearPlayersPoints = players =>
  players.map(player => {
    return {
      ...player,
      point: '',
    };
  });

const initialState = {
  pointers: [],
  observers: [],
  pointScale: '',
  showPoints: false,
};

function reducer(state, action) {
  const { event, payload } = action;
  switch (event) {
    case JOIN_ROOM:
    case LEAVE_ROOM:
      const { players, observers, pointScale } = payload;
      return { ...state, pointers: players, observers, pointScale };
    case VOTED:
      return {
        ...state,
        pointers: updatePlayersPoints(state.pointers, payload),
      };
    case CLEAR_POINTS:
      // TODO: add back successToast('Clearing Points!');
      return {
        ...state,
        pointers: clearPlayersPoints(state.pointers),
        setPointSelection: null,
        showPoints: false,
      };
    case REVEAL_POINTS:
      // TODO: add back successToast('Revealing Points!');
      return {
        ...state,
        showPoints: true,
      };
    default:
      throw new Error();
  }
}

export default function useSocketMessageReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { ...state, dispatch };
}
