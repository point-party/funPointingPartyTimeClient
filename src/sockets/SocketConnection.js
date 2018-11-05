export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const SUBMIT_POINT = 'SUBMIT_POINT';
export const REVEAL_POINTS = 'REVEAL_POINTS';
export const CLEAR_POINTS = 'CLEAR_POINTS';
export const VOTED = 'VOTED';

export default class SocketConnection {
    constructor() {
        this.conn = null;
        this.name = "";
    }

    joinRoom = (roomName, playerName, observer) => {
        if (roomName && playerName) {
            this.conn = new WebSocket(`ws://localhost:8080/joinRoom?room=${roomName}&name=${playerName}&observer=${observer}`)
            this.name = playerName;
        }
    }

    send = (event, point) => {
        if (this.conn) {
            const payload = {
                event,
                payload: {
                    point: point.toString(),
                    name: this.name,
                }
            }
            this.conn.send(JSON.stringify(payload))
        }
    }

    close = () => {
        if (this.conn) {
            this.conn.close();
        }
    }
}