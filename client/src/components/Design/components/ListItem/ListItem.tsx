/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {listItemStyle} from './ListItem.style';
import Row from './Row';

const ListItem = ({children}: React.PropsWithChildren) => {
  const {theme} = useTheme();
  return <div css={listItemStyle(theme)}>{children}</div>;
};

ListItem.Row = Row;

export default ListItem;
