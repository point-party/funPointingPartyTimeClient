import React from 'react';

import { POINTER } from '../constants/roles';

const ParticipantRow = ({ view, participant, isSelf, showPoints }) => {
  const { id, name, point } = participant;
  let rightCol;
  if (view === POINTER) {
    if (showPoints) {
      rightCol = point;
    } else if (point !== '') {
      rightCol = <span uk-icon="check" />;
    }
  }

  return (
    <div className="participant-row" key={id}>
      <span>
        {name} {isSelf && <span uk-icon="chevron-double-left" />}
      </span>
      <span>{rightCol}</span>
    </div>
  );
};

export default ParticipantRow;
