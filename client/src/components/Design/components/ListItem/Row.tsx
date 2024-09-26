/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import {rowStyle} from './ListItem.style';

const Row = ({children, ...rest}: React.HTMLAttributes<HTMLDivElement>) => {
  const {theme} = useTheme();
  return (
    <div css={rowStyle(theme)} {...rest}>
      {children}
    </div>
  );
};

export default Row;
