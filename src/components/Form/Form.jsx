import React, { memo } from 'react';

const Form = ({ id, title, children }) => (
  <form id={id} aria-labelledby={title} autoComplete="off">
    <h3 id={title}>{title}</h3>
    {children}
  </form>
);

export default memo(Form);
