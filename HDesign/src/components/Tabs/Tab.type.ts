export interface TabProps {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  children: React.ReactElement<TabProps>[];
}
