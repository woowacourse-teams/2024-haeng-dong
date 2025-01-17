export type ContentItemProps = React.PropsWithChildren & {
  label?: LabelProps;
  onEditClick?: () => void;
};

type LabelProps = {
  left?: string;
  right?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
};
