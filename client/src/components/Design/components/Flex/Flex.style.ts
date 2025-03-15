import {css} from '@emotion/react';

import {changeCamelCaseToKebabCase} from '../../utils/changeCamelCaseToKebabCase';

import {FlexDirectionStrictType, FlexProps} from './Flex.type';

export const flexStyle = ({
  justifyContent = 'flexStart',
  alignItems = 'stretch',
  flexDirection = 'row',
  gap = '0',
  padding = '0',
  paddingInline = '0',
  margin = '0',
  width = 'auto',
  height = 'auto',
  minHeight,
  backgroundColor,
  theme,
}: FlexProps) =>
  css({
    display: 'flex',
    justifyContent: changeCamelCaseToKebabCase(justifyContent),
    alignItems: changeCamelCaseToKebabCase(alignItems),
    flexDirection: changeCamelCaseToKebabCase(flexDirection) as FlexDirectionStrictType,
    gap,
    padding,
    paddingInline,
    margin,
    width,
    height,
    minHeight,

    backgroundColor: (() => {
      switch (backgroundColor) {
        case 'white':
          return theme?.colors.white;
        case 'gray':
          return theme?.colors.grayContainer;
        case 'lightGray':
          return theme?.colors.lightGrayContainer;
        default:
          return 'none';
      }
    })(),
  });
