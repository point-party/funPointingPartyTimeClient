import React, { memo } from 'react';

const FormField = ({ id, label, children }) => (
  <div className="uk-margin">
    <label className="uk-form-label" htmlFor={id}>
      {label}
    </label>
    <div className="uk-form-controls">{children}</div>
  </div>
);

export default memo(FormField);
