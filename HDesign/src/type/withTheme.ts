import {Theme} from '@theme/theme.type';

export type WithTheme<P = unknown> = P & {
  theme: Theme;
};
