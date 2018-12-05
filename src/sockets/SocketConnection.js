import { createId } from '../utils/uuid';
import { getApiUrl } from '../utils/api';
const API_URL = getApiUrl();

export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const SUBMIT_POINT = 'SUBMIT_POINT';
export const REVEAL_POINTS = 'REVEAL_POINTS';
export const CLEAR_POINTS = 'CLEAR_POINTS';
export const VOTED = 'VOTED';

export default class SocketConnection {
  constructor() {
    this.conn = null;
    this.name = '';
    this.id = createId();
  }

  joinRoom = (roomName, playerName, observer) => {
    if (roomName && playerName) {
      this.conn = new WebSocket(
        `ws://${API_URL}/joinRoom?room=${roomName}&name=${playerName}&observer=${observer}&id=${
          this.id
        }`
      );
      this.name = playerName;
    }
  };

  send = (event, point) => {
    if (this.conn) {
      let payload;
      if (point) {
        payload = {
          event,
          payload: {
            point: point.toString(),
            name: this.name,
            id: this.id,
          },
        };
      } else {
        payload = {
          event,
        };
      }
      this.conn.send(JSON.stringify(payload));
    }
  };

  close = () => {
    if (this.conn) {
      this.conn.close();
    }
  };
}
