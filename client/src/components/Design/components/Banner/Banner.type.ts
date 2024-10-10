export type BannerProps = React.HTMLAttributes<HTMLButtonElement> & {
  onDelete: () => void;
  title: string;
  description?: string;
  buttonText: string;
};
