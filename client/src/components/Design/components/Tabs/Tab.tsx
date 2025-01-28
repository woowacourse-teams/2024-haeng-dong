/** @jsxImportSource @emotion/react */

import {forwardRef} from 'react';

import {useTheme} from '@components/Design/theme/HDesignProvider';

import Text from '../Text/Text';

import {TabProps} from './Tab.type';
import {tabItemStyle, tabTextStyle} from './Tabs.style';
import {useTabContext} from './useTabContext';

const Tab = forwardRef<HTMLLIElement, TabProps>(({label, selected = false, index, onClick}, ref) => {
  const {theme} = useTheme();
  const {handleActiveTabIndex} = useTabContext();

  const handleClick = () => {
    if (onClick) onClick();
    handleActiveTabIndex(index ?? 0);
  };

  return (
    <li
      ref={ref}
      key={label}
      role="tab"
      id={`tab-${label}`}
      onClick={handleClick}
      css={tabItemStyle}
      aria-selected={selected}
      aria-controls={`tabpanel-${label}`}
    >
      <Text css={tabTextStyle({theme, selected})} size={selected ? 'bodyBold' : 'body'}>
        {label}
      </Text>
    </li>
  );
});

export default Tab;
