export type DropdownButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export type DropdownProps = {
  children: React.ReactElement<DropdownButtonProps>[];
};
