export interface TitleStyleProps {}

export interface TitleCustomProps {
  title: string;
  amount?: number;
}

export type TitleOptionProps = TitleStyleProps & TitleCustomProps;

export type TitleProps = React.ComponentProps<'div'> & TitleOptionProps;
