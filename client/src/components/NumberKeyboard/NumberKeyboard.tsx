/** @jsxImportSource @emotion/react */
import {Button, TextButton, useTheme} from '@components/Design';
import {css} from '@emotion/react';
import {RefObject, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {Keypad} from './Keypad';

type KeyboardType = 'number' | 'amount';

interface Props {
  // inputRef: RefObject<HTMLInputElement> | null;
  type: KeyboardType;
  maxNumber: number;
  onChange: (value: string) => void;
}

export default function NumberKeyboard({type, maxNumber, onChange}: Props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    onChange(value);
  }, [value, setValue]);

  const {theme} = useTheme();
  const amountKeypads = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '<-'];
  const numberKeypads = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '<-'];
  const onClickKeypad = (inputValue: string) => {
    const newNumber = Number((value + inputValue).replace(/,/g, ''));

    if (newNumber > maxNumber) {
      setValue(type === 'amount' ? maxNumber.toLocaleString() : `${maxNumber}`);
    } else {
      const newValue =
        type === 'amount' ? Number((value + inputValue).replace(/,/g, '')).toLocaleString() : value + inputValue;
      setValue(newValue);
    }
  };

  const onClickDelete = () => {
    const newValue =
      type === 'amount'
        ? Number(value.slice(0, value.length - 1).replace(/,/g, '')).toLocaleString()
        : value.slice(0, value.length - 1);
    setValue(newValue === '0' ? '' : newValue);
  };

  const onClickOneThousand = () => {
    const newNumber = Number(value.replace(/,/g, '')) + 10000;
    if (newNumber > maxNumber) {
      setValue(type === 'amount' ? maxNumber.toLocaleString() : `${maxNumber}`);
    } else {
      const newValue = newNumber.toLocaleString();
      setValue(newValue);
    }
  };

  const onClickFiveThousand = () => {
    const newNumber = Number(value.replace(/,/g, '')) + 50000;
    if (newNumber > maxNumber) {
      setValue(type === 'amount' ? maxNumber.toLocaleString() : `${maxNumber}`);
    } else {
      const newValue = newNumber.toLocaleString();
      setValue(newValue);
    }
  };

  const onClickTenThousand = () => {
    const newNumber = Number(value.replace(/,/g, '')) + 100000;
    if (newNumber > maxNumber) {
      setValue(type === 'amount' ? maxNumber.toLocaleString() : `${maxNumber}`);
    } else {
      const newValue = newNumber.toLocaleString();
      setValue(newValue);
    }
  };
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
          <Button isFull={true} size="small" variants="tertiary" onClick={() => onClickOneThousand()}>
            +1만
          </Button>
          <Button isFull={true} size="small" variants="tertiary" onClick={() => onClickFiveThousand()}>
            +5만
          </Button>
          <Button isFull={true} size="small" variants="tertiary" onClick={() => onClickTenThousand()}>
            +10만
          </Button>
          <Button isFull={true} size="small" variants="tertiary" onClick={() => setValue('')}>
            전체 삭제
          </Button>
        </div>
      )}
      {(type === 'amount' ? amountKeypads : numberKeypads).map(el => (
        <Keypad
          key={el}
          value={el}
          disabled={el === ''}
          onClick={el === '<-' ? () => onClickDelete() : () => onClickKeypad(el)}
        />
      ))}
    </div>
  );
}
