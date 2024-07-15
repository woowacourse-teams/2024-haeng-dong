type Typography = Record<string, string>;
export type TypographyTokens = Record<string, Typography>;

export const TYPOGRAPHY: TypographyTokens = {
  head: {
    fontFamily: 'Pretendard',
    fontSize: '3rem',
    lineHeight: '1.5',
    fontWeight: '700',
  },
  title: {
    fontFamily: 'Pretendard',
    fontSize: '2rem',
    lineHeight: '1.5',
    fontWeight: '700',
  },
  subTitle: {
    fontFamily: 'Pretendard',
    fontSize: '1.5rem',
    lineHeight: '1.5',
    fontWeight: '700',
  },
  bodyBold: {
    fontFamily: 'Pretendard',
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: '700',
  },
  body: {
    fontFamily: 'Pretendard',
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: '400',
  },
  smallBodyBold: {
    fontFamily: 'Pretendard',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    fontWeight: '700',
  },
  smallBody: {
    fontFamily: 'Pretendard',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    fontWeight: '400',
  },
  captionBold: {
    fontFamily: 'Pretendard',
    fontSize: '0.75rem',
    lineHeight: '1.5',
    fontWeight: '700',
  },
  caption: {
    fontFamily: 'Pretendard',
    fontSize: '0.75rem',
    lineHeight: '1.5',
    fontWeight: '400',
  },
  tiny: {
    fontFamily: 'Pretendard',
    fontSize: '0.625rem',
    lineHeight: '1.5',
    fontWeight: '400',
  },
};

export default TYPOGRAPHY;
