/** @jsxImportSource @emotion/react */
import React, {forwardRef} from 'react';

import Text from '@HDcomponents/Text/Text';
import IconButton from '@HDcomponents/IconButton/IconButton';
import Flex from '@HDcomponents/Flex/Flex';
import {useTheme} from '@theme/HDesignProvider';

import {IconChevron} from '../Icons/Icons/IconChevron';

import {ListButtonProps} from './ListButton.type';
import {listButtonStyle} from './ListButton.style';

// TODO: (@Todari) 사용하지 않는 component
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
          <IconChevron direction="right" />
        </IconButton>
      </Flex>
    </button>
  );
});

export default ListButton;
