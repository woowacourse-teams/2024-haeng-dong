/** @jsxImportSource @emotion/react */
import {createPortal} from 'react-dom';
import {useTheme} from '@theme/HDesignProvider';
import {bottomSheetContainerStyle, dimmedLayerStyle, indicatorStyle} from './BottomSheet.style';
import {BottomSheetProps} from '@components/BottomSheet/BottomSheet.type';
import {useBottomSheet} from '@components/BottomSheet/useBottomSheet';
import FixedButton from '@components/FixedButton/FixedButton';

const BottomSheet: React.FC<BottomSheetProps> = ({
  fixedButtonVariants = 'primary',
  isOpened = false,
  children,
  fixedButtonText,
  ...props
}: BottomSheetProps) => {
  const {theme} = useTheme();
  const {opened, handleClose} = useBottomSheet({isOpened, ...props});

  return createPortal(
    <>
      {opened && (
        <>
          <div css={dimmedLayerStyle(theme)} onClick={handleClose} />
          <div css={bottomSheetContainerStyle(theme)}>
            <div css={indicatorStyle(theme)} />
            {children}
            {(fixedButtonVariants || fixedButtonText) && (
              <FixedButton variants={fixedButtonVariants} children={fixedButtonText} />
            )}
          </div>
        </>
      )}
    </>,
    document.body,
  );
};

export default BottomSheet;
