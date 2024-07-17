import {Theme} from '@theme/theme.type';
export interface TitleStyleProps {}

export interface TitleCustomProps {
  title: string;
  description?: string;
}

export type TitleOptionProps = TitleStyleProps & TitleCustomProps;

export type TitleProps = React.ComponentProps<'div'> & TitleOptionProps;
