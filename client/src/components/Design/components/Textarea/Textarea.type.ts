export interface TextareaStyleProps {}

export interface TextareaCustomProps {
  // isFocus: boolean;
  // onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  maxLength?: number;
  placeholder?: string;
}

export type TextareaOptionProps = TextareaStyleProps & TextareaCustomProps;

export type TextareaProps = React.ComponentProps<'textarea'> & TextareaOptionProps;
