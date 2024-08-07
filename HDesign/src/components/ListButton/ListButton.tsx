/** @jsxImportSource @emotion/react */
import React, {forwardRef} from 'react';

import Text from '@components/Text/Text';
import IconButton from '@components/IconButton/IconButton';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';

import {useTheme} from '@theme/HDesignProvider';

import {ListButtonProps} from './ListButton.type';
import {listButtonStyle, textStyle} from './ListButton.style';

export const ListButton: React.FC<ListButtonProps> = forwardRef<HTMLButtonElement, ListButtonProps>(function Button(
  {prefix, suffix, ...htmlProps}: ListButtonProps,
  ref,
) {
  const {theme} = useTheme();
  return (
    <button css={listButtonStyle(theme)} ref={ref} {...htmlProps}>
      <Text size="caption" css={textStyle(theme)}>
        {prefix}
      </Text>
      <Flex gap="0.5rem" alignItems="center">
        <Text size="caption" css={textStyle(theme)}>
          {suffix}
        </Text>
        <IconButton variants="none">
          <Icon iconType="rightChevron" />
        </IconButton>
      </Flex>
    </button>
  );
});

export default ListButton;
