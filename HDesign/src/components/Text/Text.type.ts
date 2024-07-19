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
}

export interface TextCustomProps {}

export type TextOptionProps = TextStyleProps & TextCustomProps;

export type TextProps = React.ComponentProps<'p'> & TextOptionProps;
