import {ColorTokens} from '@token/colors';
import {TypographyTokens} from '@token/typography';
import {ZIndexTokens} from '@token/zIndex';

export interface Theme {
  colors: ColorTokens;
  typography: TypographyTokens;
  zIndex: ZIndexTokens;
}
