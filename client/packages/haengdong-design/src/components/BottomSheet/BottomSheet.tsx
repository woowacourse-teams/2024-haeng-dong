/** @jsxImportSource @emotion/react */
import {createPortal} from 'react-dom';

import {BottomSheetProps} from '@components/BottomSheet/BottomSheet.type';

import {useTheme} from '@theme/HDesignProvider';

import {useBottomSheet} from './useBottomSheet';
import {
  bottomSheetContainerStyle,
  dimmedLayerStyle,
  display,
  indicatorContainerStyle,
  indicatorStyle,
} from './BottomSheet.style';

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpened = false,
  children,
  onClose,
  onOpen,
  ...props
}: BottomSheetProps) => {
  const {theme} = useTheme();
  const {opened, visible, handleClose, handleDragStart, handleDrag, handleDragEnd, isDragging, translateY} =
    useBottomSheet({
      isOpened,
      onClose,
      onOpen,
    });

  // TODO: (@todari) : children 길이 길 때 overflow button에 안가리는 영역 처리
  return createPortal(
    <div css={display(visible)}>
      <div css={dimmedLayerStyle(theme, opened)} onClick={handleClose} />
      <div css={bottomSheetContainerStyle(theme, opened, isDragging, translateY)}>
        <div
          css={indicatorContainerStyle}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDrag}
          onTouchEnd={handleDragEnd}
        >
          <div css={indicatorStyle(theme)} />
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default BottomSheet;
