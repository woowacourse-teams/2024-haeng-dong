/** @jsxImportSource @emotion/react */
import {createPortal} from 'react-dom';
import {useEffect, useState} from 'react';

import {BottomSheetProps} from '@components/BottomSheet/BottomSheet.type';
import FixedButton from '@components/FixedButton/FixedButton';

import {useTheme} from '@theme/HDesignProvider';

import {useBottomSheet} from './useBottomSheet';
import {bottomSheetContainerStyle, dimmedLayerStyle, display, indicatorStyle} from './BottomSheet.style';

const BottomSheet: React.FC<BottomSheetProps> = ({isOpened = false, children, ...props}: BottomSheetProps) => {
  const {theme} = useTheme();
  const {opened, handleClose} = useBottomSheet({isOpened, ...props});
  const [visible, setVisible] = useState(isOpened);

  useEffect(() => {
    if (opened) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 200);

      return () => clearTimeout(timer);
    }
  }, [opened]);

  // TODO: (@todari) : children 길이 길 때 overflow button에 안가리는 영역 처리
  return createPortal(
    <div css={display(visible)}>
      <div css={dimmedLayerStyle(theme, opened)} onClick={handleClose} />
      <div css={bottomSheetContainerStyle(theme, opened)}>
        <div css={indicatorStyle(theme)} />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default BottomSheet;
