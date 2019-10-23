import React, { memo } from 'react';

const Form = ({ id, title, children }) => (
  <form id={id} autoComplete="off" className="uk-form-stacked">
    <h3>{title}</h3>
    {children}
  </form>
);

export default memo(Form);
