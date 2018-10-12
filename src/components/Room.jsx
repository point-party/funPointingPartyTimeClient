import React, { Component } from 'react';

const POINTERS = 'pointers';
const OBSERVERS = 'observers';

export class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pointers: [],
      observers: [],
      room: "621QKO",
      showPoints: false,
      points: null,
      voted: false,
      view: POINTERS,
    }
  }

  componentDidMount() {
    const { socketConnection } = this.props;
    const functionToFire = this.decideAction;
    socketConnection.conn.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      functionToFire(data);
    })
  }

  componentDidUnmount() {
    const { socketConnection } = this.props;
    socketConnection.close();
  }

  toggleView = (value) => {
    this.setState({ view: value })
  }

  selectPoints = (points) => {
    this.setState({ points })
  }

  decideAction = (data) => {
    console.log('data', data);
    if (data.event === 'player joined') {
      console.log('got in here');
      this.setState({ pointers: data.players })
    }
    if (data.event === 'voted') {
      this.setState((prevState) => ({ 
        ...prevState.pointers,
        [data.name]: data.point
       }))
    }
  }

  vote = () => {
    console.log('this.props.socketConnection', this.props.socketConnection)
    const { socketConnection} = this.props;
    socketConnection.send("voted", this.state.points)
    this.setState((prevState) => ({ voted: !prevState.voted }))
  }

  render() {
    const { socketConnection } = this.props;
    console.log('this.state.pointers', this.state.pointers);
    console.log('socketConnection', socketConnection);
    const { showPoints, pointers, observers, points, voted, view } = this.state
    const pointersView = pointers.map(pointer => <div className="pointer-row" key={pointer.name}>
      <span>{pointer.name}</span>
      <span>{showPoints ? pointer.point : (pointer.point ? <span uk-icon="check" /> : "")}</span>
    </div>)
    const observersView = observers.map(obs => <div className="pointer-row" key={obs}>
      <span>{obs}</span>
    </div>)

    return (
      <div className="room-content">
        <div className="room-content--top">
          <ul className="uk-child-width-expand" uk-tab="true">
            <li className={view === POINTERS ? "uk-active" : undefined} onClick={_ => this.toggleView(POINTERS)}>
              <a href="">Pointers</a>
            </li>
            <li className={view === OBSERVERS ? "uk-active" : undefined} onClick={_ => this.toggleView(OBSERVERS)}>
              <a href="">Observers</a>
            </li>
          </ul>
          {view === POINTERS ? pointersView : observersView}
        </div>

        <div className="room-content--slider">
          {!voted ?
            <div className="uk-position-relative uk-visible-toggle uk-light" uk-slider="finite: true">
              <div className="uk-slider-container">
                <ul className="uk-slider-items uk-child-width-1-3">
                  {['?', 1, 2, 3, 4, 5].map(value => <li key={`point-${value}`}
                                                         className={points === value ? 'point-selected' : undefined}
                                                         onClick={_ => this.selectPoints(value)}>
                    <div className="uk-position-center uk-panel"><h1>{value}</h1></div>
                  </li>)}
                </ul>
                <a className="uk-position-center-left uk-position-small" href="#" uk-slidenav-previous
                   uk-slider-item="previous">
                  <span uk-icon="icon: chevron-left; ratio: 1.5" />
                </a>
                <a className="uk-position-center-right uk-position-small" href="#" uk-slidenav-next
                   uk-slider-item="next">
                  <span uk-icon="icon: chevron-right; ratio: 1.5" />
                </a>
              </div>
            </div>
            : null}
        </div>

        <div className="room-content--bottom">
          <button
            className="uk-button uk-button-primary uk-button-large  uk-width-1-1"
            disabled={!points}
            onClick={this.vote}>
            {!voted ? 'Submit' : 'Change Vote'}
          </button>
        </div>
      </div>
    );
  }
}