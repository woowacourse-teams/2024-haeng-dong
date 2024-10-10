export type DropdownBase = 'meatballs' | 'button';

export type DropdownButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  text: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>; // 내부에서 사용하기 위한 props 외부에서 넣어주지 말 것
};

export type DropdownProps = {
  base?: DropdownBase;
  baseButtonText?: string;
  children: React.ReactElement<DropdownButtonProps>[];
};
