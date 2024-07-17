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

export type ColorTokens = Record<string, Color>;

// TODO: (@soha) 대괄호 사용에 대해 논의
export const COLORS: ColorTokens = {
  white: PRIMITIVE_COLORS.white,
  gray: PRIMITIVE_COLORS.gray[400],
  darkGray: PRIMITIVE_COLORS.gray[500],
  black: PRIMITIVE_COLORS.gray[700],
  primary: PRIMITIVE_COLORS.purple[300],
  onPrimary: PRIMITIVE_COLORS.white,
  secondary: PRIMITIVE_COLORS.purple[50],
  onSecondary: PRIMITIVE_COLORS.purple[600],
  tertiary: PRIMITIVE_COLORS.gray[200],
  onTertiary: PRIMITIVE_COLORS.gray[700],
  grayContainer: PRIMITIVE_COLORS.gray[100],
  lightGrayContainer: PRIMITIVE_COLORS.gray[50],
};
