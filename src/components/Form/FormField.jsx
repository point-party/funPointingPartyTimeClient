import React, { memo } from 'react';

const FormField = ({ fieldId, label, children }) => (
  <div className="form-field">
    <label htmlFor={fieldId}>{label}</label>
    {children}
  </div>
);

export default memo(FormField);
