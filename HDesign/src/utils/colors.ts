export const hexToRgb = (hex: string) => {
  hex = hex.slice(1);
  if (hex.length === 3) {
    hex = hex
      .split('')
      .reduce<string[]>((acc, a) => {
        acc.push(a + a);
        return acc;
      }, [])
      .join('');
  }

  if (hex.length !== 6) {
    throw new Error(`잘못된 색상값이 입력됐습니다. : ${hex} 3자리(#fff), 6자리(#fe0000)hex 값만 입력 가능합니다.`);
  }

  const regex = new RegExp(`.{1,2}`, 'g');
  const hexArray = hex.match(regex) as string[];

  return `rgb(${hexArray.map(n => parseInt(n, 16)).join(', ')})`;
};

export const rgbToColors = (rgb: string) => {
  if (rgb.slice(0, 3) !== 'rgb') {
    throw new Error('잘못된 색상값이 입력됐습니다. rgb() 값만 입력 가능합니다.');
  }

  return rgb
    .slice(4, -1)
    .split(',')
    .map(a => Number(a.trim()));
};

export const hexToColors = (hex: string) => {
  return rgbToColors(hexToRgb(hex));
};

function intToHex(int: number) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export const colorsToRgb = (colors: number[]) => {
  return `rgb(${colors.join(', ')})`;
};

export const rgbToHex = (rgb: string) => {
  const colors = rgbToColors(rgb);
  return `#${colors.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join('')}`;
};

export const colorsToHex = (colors: number[]) => {
  return rgbToHex(colorsToRgb(colors));
};

export const setDarker = (hex: string, coefficient: number) => {
  const colors = hexToColors(hex);
  const adjustCoefficient = coefficient > 1 ? 1 : coefficient < 0 ? 0 : coefficient;
  const darkerColors = colors.map(color => Math.round(color * (1 - adjustCoefficient)));

  return colorsToHex(darkerColors);
};

export const setLighter = (hex: string, coefficient: number) => {
  const colors = hexToColors(hex);
  const adjustCoefficient = coefficient > 1 ? 1 : coefficient < 0 ? 0 : coefficient;
  const lighterColors = colors.map(color => Math.round(color + (255 - color) * adjustCoefficient));

  return colorsToHex(lighterColors);
};

export const getLuminance = (hex: string) => {
  const colors = hexToColors(hex);
  const values = colors.map(color => {
    const value = color / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return Number((0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2]).toFixed(3));
};

export const setEmphasize = (hex: string, threshold: number, coefficient = 0.15) => {
  return getLuminance(hex) > threshold ? setDarker(hex, coefficient) : setLighter(hex, coefficient);
};

export const setOnTextColor = (hex: string, threshold: number, blackHex: string, whiteHex: string) => {
  return getLuminance(hex) > threshold ? blackHex : whiteHex;
};
