export const ZINDEX = {
  normal: 0,
  hidden: -1,
  visible: 1,
} as const;

type ZIndexKeys = 'normal' | 'hidden' | 'visible';
export type ZIndexTokens = Record<ZIndexKeys, number>;
