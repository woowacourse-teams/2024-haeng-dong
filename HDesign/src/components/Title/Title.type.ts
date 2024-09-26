export interface TitleStyleProps {}

export interface TitleCustomProps {
  title: string;
  description?: string;
  price?: number;
}

export type TitleOptionProps = TitleStyleProps & TitleCustomProps;

export type TitleProps = React.ComponentProps<'div'> & TitleOptionProps;
