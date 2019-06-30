import React from 'react';
import { POINTER, OBSERVER } from '../constants/roles';

const Role = ({ changeRoleAction, role, pointers, observers }) => {
  const pointersLabel = pointers ? `Pointers (${pointers.length})` : 'Pointer';
  const observersLabel = observers ? `Observers (${observers.length})` : 'Observer';
  let buttonClasses = 'uk-width-1-2 uk-button uk-button-toggle';

  return (
    <div className="uk-button-group uk-width-1-1">
      <button
        className={role === POINTER ? `${buttonClasses} uk-button-toggle--selected` : buttonClasses}
        value={POINTER}
        onClick={changeRoleAction}
      >
        {pointersLabel}
      </button>
      <button
        className={
          role === OBSERVER ? `${buttonClasses} uk-button-toggle--selected` : buttonClasses
        }
        value={OBSERVER}
        onClick={changeRoleAction}
      >
        {observersLabel}
      </button>
    </div>
  );
};

export default Role;
