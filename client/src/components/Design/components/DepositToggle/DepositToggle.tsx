/** @jsxImportSource @emotion/react */

import {useTheme} from '@theme/HDesignProvider';

import Text from '../Text/Text';

import {DepositToggleProps} from './DepositToggle.type';
import {depositToggleStyle} from './DepositToggle.style';

export const DepositToggle: React.FC<DepositToggleProps> = () => {
  const {theme} = useTheme();
  return (
    <div css={depositToggleStyle(theme)} role="button">
      <Text size="caption" className="on-focus completed">
        입금 완료
      </Text>
      <Text size="caption" className="not-completed">
        미입금
      </Text>
    </div>
  );
};
