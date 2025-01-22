/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import {IconEdit} from '../Icons/Icons/IconEdit';
import VStack from '../Stack/VStack';
import Stack from '../Stack/Stack';
import ContentLabel from '../ContentLabel/ContentLabel';

import {containerStyle, iconStyle} from './ContentItem.style';
import {ContentItemProps} from './ContentItem.type';

const ContentItem = ({labels, onEditClick, children}: ContentItemProps) => {
  const {theme} = useTheme();
  const isExistLabels = typeof labels !== 'undefined';
  const stackPadding = isExistLabels ? '8 16' : '16';

  return (
    <VStack p={stackPadding} bg={theme.colors.white} br="12" gap={8} css={containerStyle}>
      {isExistLabels && (
        <Stack w="100%" direction="row" justify="space-between" align="center">
          {labels}
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

ContentItem.Label = ContentLabel;

export default ContentItem;
