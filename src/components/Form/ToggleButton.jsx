import React, { memo } from 'react';

const ToggleButton = ({ id, text, value, selected, disabled, onClick }) => (
  <button
    id={id}
    className={`uk-width-1-2 uk-button uk-button-toggle ${selected &&
      'uk-button-toggle--selected'}`}
    value={value}
    aria-pressed={selected}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

ToggleButton.defaultProps = {
  selected: false,
  disabled: false,
};

export default memo(ToggleButton);
