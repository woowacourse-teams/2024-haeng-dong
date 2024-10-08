export type DropdownBase = 'meatballs' | 'button';

export type DropdownButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export type DropdownProps = {
  base?: DropdownBase;
  baseButtonText?: string;
  children: React.ReactElement<DropdownButtonProps>[];
};
