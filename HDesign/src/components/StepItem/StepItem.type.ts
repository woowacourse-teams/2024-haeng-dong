import {BillItemCustomProps} from '../BillItem/BillItem.type';

export interface StepItemStyleProps {}

export interface StepItemCustomProps {
  name: string;
  personCount: number;
  bills: BillItemCustomProps[];
}

export type StepItemOptionProps = StepItemStyleProps & StepItemCustomProps;

export type StepItemProps = React.ComponentProps<'div'> & StepItemOptionProps;
