import React from 'react';

export const Role = ({ observer, changeRoleAction, pointers, observers }) => {
  console.log('observer', observer);
  const pointersLabel = pointers ? `Pointers (${pointers.length})` : 'Pointer';
  const observersLabel = observers ? `Observers (${observers.length})` : 'Observer';
  let buttonClasses = 'uk-width-1-2 uk-button uk-button-toggle';

  return (
    <div className="uk-button-group uk-width-1-1">
      <button
        className={
          observer.toString() === 'false' ? `${buttonClasses} uk-button-toggle--selected` : buttonClasses
        }
        value="false"
        onClick={changeRoleAction}
      >
        {pointersLabel}
      </button>
      <button
        className={
          observer.toString() === 'true' ? `${buttonClasses} uk-button-toggle--selected` : buttonClasses
        }
        value="true"
        onClick={changeRoleAction}
      >
        {observersLabel}
      </button>
    </div>
  );
};
