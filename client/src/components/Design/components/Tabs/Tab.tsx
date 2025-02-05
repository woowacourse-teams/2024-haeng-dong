/** @jsxImportSource @emotion/react */

import {useTheme} from '@components/Design/theme/HDesignProvider';

import Text from '../Text/Text';

import {TabProps} from './Tab.type';
import {tabItemStyle, tabTextStyle} from './Tabs.style';
import {useTabContext} from './useTabContext';

const Tab = ({label, index, onClick}: TabProps) => {
  const {theme} = useTheme();
  const {activeTabIndex} = useTabContext();

  const selected = activeTabIndex === index;

  return (
    <li
      key={label}
      role="tab"
      data-label={label}
      id={`tab-${label}`}
      onClick={onClick}
      css={tabItemStyle({theme})}
      aria-selected={selected}
      aria-controls={`tabpanel-${label}`}
    >
      <Text css={tabTextStyle({theme, selected})} size={selected ? 'bodyBold' : 'body'}>
        {label}
      </Text>
    </li>
  );
};

export default Tab;
