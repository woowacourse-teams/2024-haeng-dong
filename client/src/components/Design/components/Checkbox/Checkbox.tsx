/** @jsxImportSource @emotion/react */
import {forwardRef, useState} from 'react';

import {useTheme} from '@components/Design/theme/HDesignProvider';

import {IconCheck} from '../Icons/Icons/IconCheck';

import {boxStyle, checkboxStyle, invisibleInputStyle} from './Checkbox.style';
import {CheckboxProps} from './Checkbox.type';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({right, checked: controlledChecked, onChange, defaultChecked = false, disabled, ...props}, ref) => {
    const {theme} = useTheme();
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const input = e.currentTarget.querySelector('input');
        if (input) {
          input.click();
        }
      }
    };

    return (
      <label css={checkboxStyle} role="checkbox" aria-checked={checked}>
        <div css={boxStyle({theme, checked, disabled})} aria-hidden="true" tabIndex={0} onKeyDown={handleKeyDown}>
          {checked && <IconCheck size={20} color="onPrimary" />}
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            css={invisibleInputStyle}
            aria-label="체크박스"
            {...props}
          />
        </div>
        {right}
      </label>
    );
  },
);

export default Checkbox;
