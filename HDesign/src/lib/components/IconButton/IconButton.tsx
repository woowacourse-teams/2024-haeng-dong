/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';
import {IconButtonProps} from './IconButton.type';
import inputDelete from '../../../assets/inputDelete.svg';
import plus from '../../../assets/plus.svg';

const ICON = {
  inputDelete: <img src={inputDelete} alt="삭제하기" />,
  plus: <img src={plus} alt="추가하기" />,
};

export const IconButton: React.FC<IconButtonProps> = forwardRef<HTMLButtonElement, IconButtonProps>(function Button(
  {iconType, ...htmlProps}: IconButtonProps,
  ref,
) {
  return <button ref={ref} {...htmlProps} children={ICON[iconType]} />;
});

export default IconButton;
