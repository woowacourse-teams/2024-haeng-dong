/** @jsxImportSource @emotion/react */
import React, {forwardRef} from 'react';

import Text from '@HDcomponents/Text/Text';
import IconButton from '@HDcomponents/IconButton/IconButton';
import Flex from '@HDcomponents/Flex/Flex';
import Icon from '@components/Design/components/Iconx/Icon';
import {useTheme} from '@theme/HDesignProvider';

import {ListButtonProps} from './ListButton.type';
import {listButtonStyle} from './ListButton.style';

export const ListButton: React.FC<ListButtonProps> = forwardRef<HTMLButtonElement, ListButtonProps>(function Button(
  {prefix, suffix, ...htmlProps}: ListButtonProps,
  ref,
) {
  const {theme} = useTheme();

  return (
    <button css={listButtonStyle(theme)} ref={ref} {...htmlProps}>
      <Text size="caption" textColor="gray">
        {prefix}
      </Text>
      <Flex gap="0.5rem" alignItems="center">
        <Text size="caption" textColor="gray">
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
