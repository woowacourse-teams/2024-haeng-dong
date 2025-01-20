import {InputHTMLAttributes, ReactNode} from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  right?: ReactNode;
}
