import React from 'react';
import { POINTER, OBSERVER } from '../constants/roles';

export const SwitchView = ({ changeView, pointers, observers, view }) => {
  const pointersLabel = pointers ? `Pointers (${pointers.length})` : 'Pointer';
  const observersLabel = observers ? `Observers (${observers.length})` : 'Observer';
  let buttonClasses = 'uk-width-1-2 uk-button uk-button-toggle';

  return (
    <div className="uk-button-group uk-width-1-1">
      <button
        className={view === POINTER ? `${buttonClasses} uk-button-toggle--selected` : buttonClasses}
        value={POINTER}
        onClick={changeView}
      >
        {pointersLabel}
      </button>
      <button
        className={
          view === OBSERVER ? `${buttonClasses} uk-button-toggle--selected` : buttonClasses
        }
        value={OBSERVER}
        onClick={changeView}
      >
        {observersLabel}
      </button>
    </div>
  );
};
