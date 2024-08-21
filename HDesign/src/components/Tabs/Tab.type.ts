import {FlexProps} from '../Flex/Flex.type';

export interface TabProps {
  label: string;
  content: React.ReactNode;
}

export interface TabsCustomProps {
  children: React.ReactElement<TabProps>[];
}

export interface TabsStyleProps {
  tabsContainerStyle?: FlexProps;
}

export type TabsProps = TabsCustomProps & TabsStyleProps;
