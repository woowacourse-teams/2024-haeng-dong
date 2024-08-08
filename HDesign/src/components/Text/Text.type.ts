import {Theme} from '@theme/theme.type';
import {ColorKeys} from '@token/colors';

export type TextSize =
  | 'head'
  | 'title'
  | 'subTitle'
  | 'body'
  | 'smallBody'
  | 'caption'
  | 'tiny'
  | 'bodyBold'
  | 'smallBodyBold'
  | 'captionBold';

export interface TextStyleProps {
  size?: TextSize;
  color?: ColorKeys;
}

export interface TextStylePropsWithTheme extends TextStyleProps {
  theme: Theme;
}

export interface TextCustomProps {}

export type TextOptionProps = TextStyleProps & TextCustomProps;

export type TextProps = React.ComponentProps<'p'> & TextOptionProps;
