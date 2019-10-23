import React, { memo } from 'react';
import cn from 'classnames';

const Button = ({ id, value, children, onClick, selected, disabled, type, className }) => (
  <button
    id={id}
    type={type}
    className={cn('btn', className, {
      'btn--selected': selected,
      'btn--disabled': disabled,
      'btn--large': type === 'submit',
    })}
    value={value}
    aria-pressed={selected}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.defaultProps = {
  selected: false,
  disabled: false,
  type: 'button',
};

export default memo(Button);
