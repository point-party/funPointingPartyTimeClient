import React, { memo } from 'react';
import FormField from './FormField';

const TextField = ({ id, label, value, onChange, uppercase }) => (
  <FormField id={id} label={label}>
    <div className="uk-form-controls">
      <input
        value={value}
        className={`uk-input ${uppercase ? 'uppercase-input' : ''}`}
        id={id}
        type="text"
        placeholder=""
        onChange={onChange}
      />
    </div>
  </FormField>
);

TextField.defaultProps = {
  uppercase: false,
};

export default memo(TextField);
