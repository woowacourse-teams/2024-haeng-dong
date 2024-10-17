/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import {useTheme} from '@components/Design/theme/HDesignProvider';

import {Button} from '@components/Design';

import {Keypad} from './Keypad';
import useNumberKeyboard from './useNumberKeyboard';
import {amountKeypads, numberKeypads} from './keypads';

export type KeyboardType = 'number' | 'string' | 'amount';

export interface NumberKeyboardProps {
  type: KeyboardType;
  maxNumber: number;
  initialValue?: string;
  onChange: (value: string) => void;
}

export default function NumberKeyboard({type, maxNumber, initialValue, onChange}: NumberKeyboardProps) {
  const {theme} = useTheme();

  const {onClickKeypad, onClickDelete, onClickDeleteAll, onClickAddAmount} = useNumberKeyboard({
    type,
    initialValue,
    maxNumber,
    onChange,
  });

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: ${type === 'amount' ? 'auto' : null} repeat(4, 1fr);
        padding: 1rem;
        gap: 1rem;
        width: 100%;
        max-width: 768px;
        background-color: ${theme.colors.white};
      `}
    >
      {type === 'amount' && (
        <div
          css={css`
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
          `}
        >
          <Button size="small" variants="tertiary" onClick={() => onClickAddAmount(10000)}>
            +1만
          </Button>
          <Button size="small" variants="tertiary" onClick={() => onClickAddAmount(50000)}>
            +5만
          </Button>
          <Button size="small" variants="tertiary" onClick={() => onClickAddAmount(100000)}>
            +10만
          </Button>
          <Button size="small" variants="tertiary" onClick={onClickDeleteAll}>
            전체 삭제
          </Button>
        </div>
      )}
      {(type === 'amount' ? amountKeypads : numberKeypads).map(({keypad, ariaLabel}) => (
        <Keypad
          key={keypad}
          value={keypad}
          aria-label={ariaLabel}
          disabled={keypad === ''}
          onClick={keypad === '<-' ? onClickDelete : () => onClickKeypad(keypad)}
        />
      ))}
    </div>
  );
}
