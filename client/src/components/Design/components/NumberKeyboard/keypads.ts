export type KeyboardType = 'number' | 'string' | 'amount';

type Keypad = {
  keypad: string;
  ariaLabel: string;
};

export const makeKeypads = (type: KeyboardType): Keypad[] => {
  const keypads: Keypad[] = [];

  // 1~9는 동일
  keypads.push(...new Array(9).fill(0).map((_, index) => ({keypad: String(index + 1), ariaLabel: String(index + 1)})));

  // amount는 00버튼 나머지는 숨기기
  if (type === 'amount') {
    keypads.push({keypad: '00', ariaLabel: '0 2개 버튼'});
  } else {
    keypads.push({keypad: '', ariaLabel: ''});
  }

  // 나머지 0과 지우기 버튼
  keypads.push({keypad: '0', ariaLabel: '0'});
  keypads.push({
    keypad: '<-',
    ariaLabel: '마지막 숫자 지우기',
  });

  return keypads;
};
