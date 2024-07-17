/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import InputDelete from '@assets/inputDelete.svg';
import Plus from '@assets/plus.svg';

import {IconButtonProps} from '@components/IconButton/IconButton.type';

const ICON = {
  inputDelete: <InputDelete />,
  plus: <Plus />,
};

export const IconButton: React.FC<IconButtonProps> = forwardRef<HTMLButtonElement, IconButtonProps>(function Button(
  {iconType, ...htmlProps}: IconButtonProps,
  ref,
) {
  return (
    <button ref={ref} {...htmlProps}>
      {ICON[iconType]}
    </button>
  );
});

export default IconButton;
