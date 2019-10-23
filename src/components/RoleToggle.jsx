import React from 'react';
import Button from './Form/Button';
import { POINTER, OBSERVER } from '../constants/roles';

const RoleToggle = ({ fieldId, onChangeAction, role, pointers, observers }) => {
  const pointerLabel = pointers ? `Pointers (${pointers.length})` : 'Pointer';
  const observerLabel = observers ? `Observers (${observers.length})` : 'Observer';

  return (
    <div id={fieldId} className="btn-group">
      <Button
        id="pointer-role-toggle"
        value={POINTER}
        selected={role === POINTER}
        onClick={onChangeAction}
      >
        {pointerLabel}
      </Button>
      <Button
        id="observer-role-toggle"
        value={OBSERVER}
        selected={role === OBSERVER}
        onClick={onChangeAction}
      >
        {observerLabel}
      </Button>
    </div>
  );
};

export default RoleToggle;
