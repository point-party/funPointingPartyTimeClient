import React, { memo } from 'react';
import cn from 'classnames';
import FormField from './FormField';

const TextField = ({ fieldId, label, value, onChange, uppercase, autoFocus }) => (
  <FormField fieldId={fieldId} label={label}>
    <input
      value={value}
      className={cn('input', {
        'uppercase-input': uppercase,
      })}
      id={fieldId}
      type="text"
      onChange={onChange}
      autoFocus={autoFocus}
    />
  </FormField>
);

TextField.defaultProps = {
  uppercase: false,
  autoFocus: false,
};

export default memo(TextField);
