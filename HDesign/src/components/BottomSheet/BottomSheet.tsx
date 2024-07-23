/** @jsxImportSource @emotion/react */
import {createPortal} from 'react-dom';

import {BottomSheetProps} from '@components/BottomSheet/BottomSheet.type';
import {useBottomSheet} from './useBottomSheet';
import FixedButton from '@components/FixedButton/FixedButton';

import {useTheme} from '@theme/HDesignProvider';

import {bottomSheetContainerStyle, dimmedLayerStyle, indicatorStyle} from './BottomSheet.style';

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpened = false,
  children,
  fixedButtonProps,
  ...props
}: BottomSheetProps) => {
  const {theme} = useTheme();
  const {opened, handleClose} = useBottomSheet({isOpened, ...props});

  // TODO: (@todari) : children 길이 길 때 overflow button에 안가리는 영역 처리
  return createPortal(
    <>
      {opened && (
        <>
          <div css={dimmedLayerStyle(theme)} onClick={handleClose} />
          <div css={bottomSheetContainerStyle(theme)}>
            <div css={indicatorStyle(theme)} />
            {children}
            {fixedButtonProps && <FixedButton {...fixedButtonProps} />}
          </div>
        </>
      )}
    </>,
    document.body,
  );
};

export default BottomSheet;
