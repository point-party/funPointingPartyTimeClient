import React from 'react';
import { POINTER, OBSERVER } from '../constants/roles';
import ToggleButton from './Form/ToggleButton';

const Role = ({ id, changeRoleAction, role, pointers, observers }) => {
  const pointerLabel = pointers ? `Pointers (${pointers.length})` : 'Pointer';
  const observerLabel = observers ? `Observers (${observers.length})` : 'Observer';

  return (
    <div id={id} className="uk-button-group uk-width-1-1">
      <ToggleButton
        id="pointer-role-toggle"
        text={pointerLabel}
        value={POINTER}
        selected={role === POINTER}
        onClick={changeRoleAction}
      />
      <ToggleButton
        id="observer-role-toggle"
        text={observerLabel}
        value={OBSERVER}
        selected={role === OBSERVER}
        onClick={changeRoleAction}
      />
    </div>
  );
};

export default Role;
