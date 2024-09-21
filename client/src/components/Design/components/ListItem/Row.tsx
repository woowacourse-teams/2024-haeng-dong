/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import {rowStyle} from './ListItem.style';

const Row = ({children}: React.PropsWithChildren) => {
  const {theme} = useTheme();
  return <div css={rowStyle(theme)}>{children}</div>;
};

export default Row;
