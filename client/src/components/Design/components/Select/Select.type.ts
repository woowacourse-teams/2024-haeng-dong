export type SelectInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'> & {
  labelText?: string;
  placeholder?: string;
  hasFocus?: boolean;
  setHasFocus?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SelectProps = SelectInputProps & {
  defaultValue?: string;
  options: string[];
  onSelect: (option: string) => void;
};
