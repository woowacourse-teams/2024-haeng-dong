type Unit = null | 'px' | '%' | 'em' | 'rem' | 'vh' | 'vw';

const checkStringUnit = (value?: string) => {
  if (!value) return '';
  if (value.includes('%')) return '%';
  if (value.includes('rem')) return 'rem';
  if (value.includes('em')) return 'em';
  if (value.includes('vh')) return 'vh';
  if (value.includes('vw')) return 'vw';
  if (value.includes('px')) return 'px';
  return null;
};

export const stringValueWithUnit = (value?: string | number) => {
  if (!value) return '';
  const stringValue = typeof value === 'number' ? `${value}px` : value;
  const unit = checkStringUnit(stringValue);
  return `${stringValue}${unit === null ? (isNaN(Number(stringValue)) ? unit : 'px') : ''}`;
};

export const stringAndNumberValue = (value?: string | number) => {
  if (!value) return '';
  return typeof value === 'number' ? `${value}` : value;
};

export const stringValueWithSpacing = (value?: string | number) => {
  if (!value) return '';
  return stringAndNumberValue(value).split(' ').map(stringValueWithUnit).join(' ');
};

type AttributeKey = 'maxW' | 'w' | 'h' | 'z' | 'p' | 'm' | 'br' | 'b' | 'gap';

export const attributeWithUnit = (attributes: Partial<Record<AttributeKey, string | number | undefined>>) => {
  if (!attributes) return '';
  return Object.entries(attributes).map(([key, value]) => {
    if (key === 'p' || key === 'm') {
      return stringValueWithSpacing(value);
    }
    if (key === 'z') {
      return stringAndNumberValue(value);
    }
    return stringValueWithUnit(value);
  });
};

export const ariaProps = (props: React.HTMLAttributes<HTMLElement>) => {
  const ariaAttributes = Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (key.startsWith('aria-')) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, unknown>,
  );

  return ariaAttributes;
};

export const nonAriaProps = (props: React.HTMLAttributes<HTMLElement>) => {
  const nonAriaAttributes = Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (!key.startsWith('aria-')) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, unknown>,
  );
  return nonAriaAttributes;
};
