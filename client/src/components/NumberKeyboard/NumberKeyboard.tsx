/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useEffect, useState} from 'react';

import {Button, useTheme} from '@components/Design';

import {Keypad} from './Keypad';
import useNumberKeyboard from './useNumberKeyboard';

export type KeyboardType = 'number' | 'string' | 'amount';

interface Props {
  type: KeyboardType;
  maxNumber: number;
  onChange: (value: string) => void;
}

export default function NumberKeyboard({type, maxNumber, onChange}: Props) {
  const {theme} = useTheme();
  const amountKeypads = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '<-'];
  const numberKeypads = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '<-'];

  const {onClickKeypad, onClickDelete, onClickDeleteAll, onClickAddAmount} = useNumberKeyboard({
    type,
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
      {(type === 'amount' ? amountKeypads : numberKeypads).map(el => (
        <Keypad
          key={el}
          value={el}
          disabled={el === ''}
          onClick={el === '<-' ? onClickDelete : () => onClickKeypad(el)}
        />
      ))}
    </div>
  );
}
