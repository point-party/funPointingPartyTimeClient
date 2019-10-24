import React from 'react';
import { SCALES } from '../constants/scales';

const Ballot = ({ visible, toggleSheetVisibility, pointScale, voteAction, pointSelection }) => {
  if (!pointScale) {
    return null;
  }

  const ballotClassList = visible ? 'ballot-list ballot-list--visible' : 'ballot-list';
  return (
    <ol className={ballotClassList} onClick={toggleSheetVisibility} aria-label="ballot">
      <li id="close-ballot" className="ballot-list-item ballot-list-item--close">
        <span /> <span uk-icon="close" />
      </li>
      {['?', ...SCALES[pointScale].values].map(value => {
        const selected = pointSelection === value;
        const itemClassList = selected
          ? 'ballot-list-item ballot-list-item--selected'
          : 'ballot-list-item';
        return (
          <li
            key={`point-${value}`}
            id={`point-${value}`}
            className={itemClassList}
            onClick={() => voteAction(value)}
          >
            {value} {selected && <span uk-icon="check" />}
          </li>
        );
      })}
    </ol>
  );
};

export default Ballot;
