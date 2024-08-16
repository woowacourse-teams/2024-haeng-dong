import {useEffect} from 'react';

import {useEditableItemContext} from './EditableItem.context';

interface UseEditableItemProps {
  onInputFocus?: () => void;
  onInputBlur?: () => void;
}

const useEditableItem = ({onInputFocus, onInputBlur}: UseEditableItemProps) => {
  const {hasAnyFocus} = useEditableItemContext();

  useEffect(() => {
    if (hasAnyFocus && onInputFocus) {
      onInputFocus();
    }
    if (!hasAnyFocus && onInputBlur) {
      onInputBlur();
    }
  }, [hasAnyFocus, onInputFocus, onInputBlur]);
};

export default useEditableItem;
