/** @jsxImportSource @emotion/react */
import {createPortal} from 'react-dom';
import {useTheme} from '../../theme/HDesignProvider';
import {bottomSheetContainerStyle, dimmedLayerStyle, indicatorStyle} from './BottomSheet.style';
import {BottomSheetProps} from './BottomSheet.type';
import {useBottomSheet} from './useBottomSheet';
import FixedButton from '../FixedButton/FixedButton';

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  fixedButtonVariants = 'primary',
  fixedButtonText,
  ...props
}: BottomSheetProps) => {
  const {theme} = useTheme();
  const {opened, handleClose} = useBottomSheet(props);

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
