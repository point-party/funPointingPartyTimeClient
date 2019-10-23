import React, { memo } from 'react';
import cn from 'classnames';
import FormField from './FormField';

const TextField = ({ fieldId, label, value, onChange, uppercase }) => (
  <FormField fieldId={fieldId} label={label}>
    <input
      value={value}
      className={cn('input', {
        'uppercase-input': uppercase,
      })}
      id={fieldId}
      type="text"
      onChange={onChange}
    />
  </FormField>
);

TextField.defaultProps = {
  uppercase: false,
};

export default memo(TextField);
