/** @jsxImportSource @emotion/react */
import React, {useEffect} from 'react';

import {useTheme} from '@theme/HDesignProvider';

import {editableItemStyle} from './EditableItem.style';

import EditableItemInput from './EditableItem.Input';
import {EditableItemProps} from './EditableItem.type';
import {EditableItmProvider, useEditableItemContext} from './EditableItem.context';
import useEditableItem from './useEditableItem';

const EditableItemBase = ({
  onInputFocus,
  onInputBlur,
  backgroundColor = 'white',
  children,
  ...htmlProps
}: EditableItemProps) => {
  const {theme} = useTheme();

  useEditableItem({onInputFocus, onInputBlur});

  return (
    <div css={editableItemStyle(theme, backgroundColor)} {...htmlProps}>
      {children}
    </div>
  );
};

export const EditableItem = (props: EditableItemProps) => {
  return (
    <EditableItmProvider>
      <EditableItemBase {...props} />
    </EditableItmProvider>
  );
};

EditableItem.Input = EditableItemInput;

export default EditableItem;
