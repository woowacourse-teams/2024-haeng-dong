import {useCallback, useEffect, useState} from 'react';

import {useEditableItemContext} from './EditableItem.context';

interface UseEditableItemInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

const useEditableItemInput = ({inputRef}: UseEditableItemInputProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  const {setHasAnyFocus} = useEditableItemContext();

  const handleFocus = useCallback(() => {
    setHasFocus(true);
    setHasAnyFocus(true);
  }, [setHasAnyFocus]);

  const handleBlur = useCallback(() => {
    setHasFocus(false);
    setHasAnyFocus(false);
  }, [setHasAnyFocus]);

  useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);

      return () => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      };
    }

    return;
  }, [handleFocus, handleBlur, inputRef]);

  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      handleFocus();
    }
  }, [handleFocus, inputRef]);

  return {hasFocus};
};

export default useEditableItemInput;
