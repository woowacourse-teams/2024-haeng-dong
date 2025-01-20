import {InputHTMLAttributes, ReactNode} from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  right?: ReactNode;
}
