import React from 'react';

import { ReactComponent as Check } from '../svg/check.svg';
import { ReactComponent as Back } from '../svg/back.svg';
import { POINTER } from '../constants/roles';

const ParticipantRow = ({ view, participant, isSelf, showPoints }) => {
  const { id, name, point } = participant;
  let rightCol;
  if (view === POINTER) {
    if (showPoints) {
      rightCol = point;
    } else if (point !== '') {
      rightCol = <Check title="participant-has-voted-icon" className="icon icon--green" />;
    }
  }

  return (
    <div className="participant-row" key={id}>
      <span>
        {name}{' '}
        {isSelf && <Back title="self-indicator-icon" className="icon icon--blue icon--small" />}
      </span>
      <span>{rightCol}</span>
    </div>
  );
};

export default ParticipantRow;
