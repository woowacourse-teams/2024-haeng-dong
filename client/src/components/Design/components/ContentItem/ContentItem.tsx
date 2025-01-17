/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import {IconEdit} from '../Icons/Icons/IconEdit';
import VStack from '../Stack/VStack';
import Stack from '../Stack/Stack';
import ContentLabel from '../ContentLabel/ContentLabel';

import {containerStyle, iconStyle} from './ContentItem.style';
import {ContentItemProps} from './ContentItem.type';

const ContentItem = ({label, onEditClick, children}: ContentItemProps) => {
  const {theme} = useTheme();
  const isExistLabel = typeof label !== 'undefined';
  const stackPadding = isExistLabel ? '8 16' : '16';

  return (
    <VStack p={stackPadding} bg={theme.colors.white} br="12" gap={8} css={containerStyle}>
      {isExistLabel && (
        <Stack w="100%" direction="row" justify="space-between" align="center">
          <ContentLabel label={label?.left} onClick={label?.onLeftClick} />
          <ContentLabel label={label?.right} onClick={label?.onRightClick} />
        </Stack>
      )}
      {children}
      {onEditClick && (
        <button onClick={onEditClick} css={iconStyle}>
          <IconEdit />
        </button>
      )}
    </VStack>
  );
};

export default ContentItem;
