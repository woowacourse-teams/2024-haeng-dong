import {FlexProps} from '../Flex/Flex.type';

export interface TabProps {
  label: string;
  content: React.ReactNode;
  selected?: boolean;
  index?: number;
  ref?: React.Ref<HTMLLIElement>;
}

export interface TabsCustomProps {
  children: React.ReactElement<TabProps>[];
  active?: number;
}

export interface TabsStyleProps {
  tabsContainerStyle?: FlexProps;
}

export type TabsProps = TabsCustomProps & TabsStyleProps;
