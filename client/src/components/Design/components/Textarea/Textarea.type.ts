export interface TextareaStyleProps {
  height?: string;
}

export interface TextareaCustomProps {
  value: string;
  maxLength?: number;
  placeholder?: string;
}

export type TextareaOptionProps = TextareaStyleProps & TextareaCustomProps;

export type TextareaProps = React.ComponentProps<'textarea'> & TextareaOptionProps;
