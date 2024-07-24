import {TextSize} from '../Text/Text.type';

export type TextColor = 'black' | 'gray';

export interface TextButtonStyleProps {
  textColor: TextColor;
}

export interface TextButtonCustomProps {
  textSize: TextSize;
}

export type TextButtonOptionProps = TextButtonStyleProps & TextButtonCustomProps;

export type TextButtonProps = React.ComponentProps<'button'> & TextButtonOptionProps;
