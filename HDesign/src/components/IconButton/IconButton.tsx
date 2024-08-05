/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import {IconButtonProps} from '@components/IconButton/IconButton.type';
import {InputDelete, Plus, Buljusa} from '@assets';

const ICON = {
  inputDelete: <InputDelete />,
  plus: <Plus />,
  buljusa: <Buljusa />,
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
