/** @jsxImportSource @emotion/react */

import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {ElementProps} from './Element.type';
import Input from '../Input/Input';
import {useGroupInputContext} from './GroupInputContext';

const Element: React.FC<ElementProps> = forwardRef<HTMLInputElement, ElementProps>(function Element(
  {key, value, onChange, isError, ...htmlProps}: ElementProps,
  ref,
) {
  useImperativeHandle(ref, () => inputRef.current!);
  const inputRef = useRef<HTMLInputElement>(null);
  const {setHasAnyFocus, values, setValues, hasErrors, setHasErrors} = useGroupInputContext();

  useEffect(() => {
    setHasErrors({...hasErrors, [key]: isError ?? false});

    inputRef.current?.addEventListener('change', () => setValues({...values, [key]: `${value}`}));
    inputRef.current?.addEventListener('focus', () => setHasAnyFocus(true));
    inputRef.current?.addEventListener('blur', () => setHasAnyFocus(false));

    return () => {
      inputRef.current?.removeEventListener('change', () => setValues({...values, [key]: `${value}`}));
      inputRef.current?.removeEventListener('focus', () => setHasAnyFocus(true));
      inputRef.current?.removeEventListener('blur', () => setHasAnyFocus(false));
    };
  }, []);

  return <Input ref={inputRef} isError={isError} {...htmlProps} />;
});

export default Element;
