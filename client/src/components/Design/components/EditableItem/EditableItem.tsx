/** @jsxImportSource @emotion/react */
import Text from '@HDcomponents/Text/Text';
import Flex from '@HDcomponents/Flex/Flex';

import {useTheme} from '@theme/HDesignProvider';

import {editableItemStyle, labelTextStyle} from './EditableItem.style';
import EditableItemInput from './EditableItem.Input';
import {EditableItemProps} from './EditableItem.type';
import {EditableItemProvider} from './EditableItem.context';
import useEditableItem from './useEditableItem';

const EditableItemBase = ({
  onInputFocus,
  onInputBlur,
  prefixLabelText,
  suffixLabelText,
  backgroundColor = 'white',
  children,
  ...htmlProps
}: EditableItemProps) => {
  const {theme} = useTheme();

  useEditableItem({onInputFocus, onInputBlur});

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="spaceBetween" width="100%">
        <Text size="caption" css={labelTextStyle(theme, 'prefix')}>
          {prefixLabelText}
        </Text>
        <Text size="caption" css={labelTextStyle(theme, 'suffix')}>
          {suffixLabelText}
        </Text>
      </Flex>

      <div css={editableItemStyle(theme, backgroundColor)} {...htmlProps}>
        {children}
      </div>
    </Flex>
  );
};

export const EditableItem = (props: EditableItemProps) => {
  return (
    <EditableItemProvider>
      <EditableItemBase {...props} />
    </EditableItemProvider>
  );
};

EditableItem.Input = EditableItemInput;

export default EditableItem;
