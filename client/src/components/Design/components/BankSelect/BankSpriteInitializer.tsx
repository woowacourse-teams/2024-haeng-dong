/** @jsxImportSource @emotion/react */
import {createPortal} from 'react-dom';

import BankSprite from '@assets/image/largeBankSprites.svg';

export const BankSpriteInitializer = () => {
  return createPortal(<BankSprite />, document.body);
};
