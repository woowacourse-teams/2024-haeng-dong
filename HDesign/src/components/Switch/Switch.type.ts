export interface SwitchProps {
  value?: string;
  initialValue?: string;
  values: string[];
  onChange: (value: string) => void;
}
