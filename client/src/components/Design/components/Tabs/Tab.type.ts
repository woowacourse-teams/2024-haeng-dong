export type TabProps = Omit<React.ComponentProps<'li'>, 'content'> & {
  label: string;
  content: React.ReactNode;
  index?: number;
};

export type TabsProps = {
  children: React.ReactElement<TabProps>[];
};
