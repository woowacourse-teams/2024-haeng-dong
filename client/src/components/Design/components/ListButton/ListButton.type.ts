export interface ListButtonStyleProps {}

export interface ListButtonCustomProps {
  prefix?: string;
  suffix?: string;
}

export type ListButtonOptionProps = ListButtonStyleProps & ListButtonCustomProps;

export type ListButtonProps = React.ComponentProps<'button'> & ListButtonOptionProps;
