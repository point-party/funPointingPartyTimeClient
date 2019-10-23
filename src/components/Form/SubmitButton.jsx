import React, { memo } from 'react';

const SubmitButton = ({ id, text, disabled, onClick }) => (
  <div className="uk-margin">
    <button
      id={id}
      type="submit"
      className="uk-button uk-button-default uk-button-large uk-width-1-1"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  </div>
);

export default memo(SubmitButton);
