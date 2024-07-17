type IconButtonType = 'inputDelete' | 'plus';

export interface IconButtonStyleProps {}

export interface IconButtonCustomProps {
  iconType: IconButtonType;
}

export type IconButtonOptionProps = IconButtonStyleProps & IconButtonCustomProps;

export type IconButtonProps = React.ComponentProps<'button'> & IconButtonOptionProps;
