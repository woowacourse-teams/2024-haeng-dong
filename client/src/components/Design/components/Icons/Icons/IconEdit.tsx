/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconEdit = ({color = 'gray', size, width, height, ...rest}: Omit<SvgProps, 'children'>) => {
  const {theme} = useTheme();
  const w = width ?? size ?? 18;
  const h = height ?? size ?? 18;
  const x = w / 18;
  const y = h / 18;

  return (
    <Svg size={size} width={w} height={h} {...rest}>
      <path
        d={`M${12.214 * x} ${2.98152 * y}L${13.616 * x} ${1.58052 * y}C${13.9877 * x} ${1.20882 * y} ${14.4918 * x} ${1 * y} ${15.0175 * x} ${1 * y}C${15.5432 * x} ${1 * y} ${16.0473 * x} ${1.20882 * y} ${16.419 * x} ${1.58052 * y}C${16.7907 * x} ${1.95222 * y} ${16.9995 * x} ${2.45636 * y} ${16.9995 * x} ${2.98202 * y}C${16.9995 * x} ${3.50768 * y} ${16.7907 * x} ${4.01182 * y} ${16.419 * x} ${4.38352 * y}L${15.018 * x} ${5.78552 * y}M${12.214 * x} ${2.98152 * y}L${3.98 * x} ${11.2155 * y}C${2.935 * x} ${12.2615 * y} ${2.412 * x} ${12.7835 * y} ${2.056 * x} ${13.4205 * y}C${1.7 * x} ${14.0575 * y} ${1.342 * x} ${15.5605 * y} ${1 * x} ${16.9995 * y}C${2.438 * x} ${16.6575 * y} ${3.942 * x} ${16.2995 * y} ${4.579 * x} ${15.9435 * y}C${5.216 * x} ${15.5875 * y} ${5.739 * x} ${15.0645 * y} ${6.784 * x} ${14.0195 * y}L${15.018 * x} ${5.78552 * y}M${12.214 * x} ${2.98152 * y}L${15.018 * x} ${5.78552 * y}M${8 * x} ${16.9995 * y}H${14 * x}`}
        stroke={theme.colors[color]}
        stroke-width={Math.min(w, h) * 0.1}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
