export type SelectInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'> & {
  labelText?: string;
  placeholder?: string;
  hasFocus?: boolean;
  setHasFocus?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SelectProps<T> = SelectInputProps & {
  defaultValue?: T;
  options: T[];
  onSelect: (option: T) => void;
};
