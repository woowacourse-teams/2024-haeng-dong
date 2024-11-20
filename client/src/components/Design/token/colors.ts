const PRIMITIVE_COLORS = {
  white: '#FFFFFF',
  purple: {
    50: '#f4e8ff',
    100: '#e0c7fe',
    200: '#cba0fe',
    300: '#b575ff',
    400: '#a350fd',
    500: '#8f2bf3',
    600: '#8425ec',
    700: '#7519e3',
    800: '#6712db',
    900: '#5100cd',
  },
  pink: {
    50: '#ffe1ff',
    100: '#feafd9',
    200: '#ff75bf',
    300: '#fc28a1',
    400: '#f60087',
    500: '#f2006d',
    600: '#e1006a',
    700: '#ca0065',
    800: '#b30062',
    900: '#8b005b',
  },
  yellow: {
    50: '#fdffe9',
    100: '#f7fdc5',
    200: '#f0fb9d',
    300: '#e8f972',
    400: '#ecff59',
    500: '#e5fb31',
    600: '#daeb2e',
    700: '#c9d323',
    800: '#b9bb17',
    900: '#9e9305',
  },
  green: {
    50: '#f4ffe8',
    100: '#e4ffc6',
    200: '#d1ff9f',
    300: '#bfff75',
    400: '#b0fd51',
    500: '#a4f932',
    600: '#9de728',
    700: '#90cf18',
    800: '#85b704',
    900: '#748f00',
  },
  gray: {
    50: '#F9F8FD',
    100: '#F1F0F5',
    200: '#E7E6EB',
    300: '#D6D5DA',
    400: '#B2B1B6',
    500: '#929195',
    600: '#6A696D',
    700: '#56555A',
    800: '#38373B',
    900: '#18171B',
  },
};

type Color = string;

export type ColorKeys =
  | 'white'
  | 'black'
  | 'primary'
  | 'onPrimary'
  | 'secondary'
  | 'onSecondary'
  | 'tertiary'
  | 'onTertiary'
  | 'gray'
  | 'darkGray'
  | 'grayContainer'
  | 'lightGrayContainer'
  | 'error'
  | 'errorContainer'
  | 'onErrorContainer'
  | 'warn'
  | 'complete'
  | 'kakao'
  | 'onKakao';
export type ColorTokens = Record<ColorKeys, Color>;

// TODO: (@soha) 대괄호 사용에 대해 논의
export const COLORS: ColorTokens = {
  white: PRIMITIVE_COLORS.white,
  black: PRIMITIVE_COLORS.gray[700],

  primary: PRIMITIVE_COLORS.purple[300],
  onPrimary: PRIMITIVE_COLORS.white,
  secondary: PRIMITIVE_COLORS.purple[50],
  onSecondary: PRIMITIVE_COLORS.purple[600],
  tertiary: PRIMITIVE_COLORS.gray[200],
  onTertiary: PRIMITIVE_COLORS.gray[700],

  gray: PRIMITIVE_COLORS.gray[400],
  darkGray: PRIMITIVE_COLORS.gray[500],
  grayContainer: PRIMITIVE_COLORS.gray[100],
  lightGrayContainer: PRIMITIVE_COLORS.gray[50],

  error: PRIMITIVE_COLORS.pink[200],
  errorContainer: PRIMITIVE_COLORS.pink[50],
  onErrorContainer: PRIMITIVE_COLORS.pink[300],
  warn: PRIMITIVE_COLORS.yellow[400],
  complete: PRIMITIVE_COLORS.green[300],

  kakao: '#FEE500',
  onKakao: '#181600',
};

export const PRIMARY_COLORS = PRIMITIVE_COLORS.purple;
