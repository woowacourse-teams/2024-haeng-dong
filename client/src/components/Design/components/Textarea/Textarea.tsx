/** @jsxImportSource @emotion/react */
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';

import {useTheme} from '@components/Design/theme/HDesignProvider';

import {textareaStyle} from './Textarea.style';
import {TextareaProps} from './Textarea.type';

const Textarea: React.FC<TextareaProps> = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textrea(
  {placeholder, maxLength, onChange, value, height, ...htmlProps}: TextareaProps,
  ref,
) {
  const {theme} = useTheme();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  useImperativeHandle(ref, () => inputRef.current!);

  useEffect(() => {
    inputRef.current?.addEventListener('focus', () => setIsFocus(true));
    inputRef.current?.addEventListener('blur', () => setIsFocus(false));
    return () => {
      inputRef.current?.removeEventListener('focus', () => setIsFocus(true));
      inputRef.current?.removeEventListener('blur', () => setIsFocus(false));
    };
  }, []);

  return (
    <textarea
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      ref={inputRef}
      css={textareaStyle({theme, isFocus, height})}
      {...htmlProps}
    ></textarea>
  );
});
export default Textarea;
