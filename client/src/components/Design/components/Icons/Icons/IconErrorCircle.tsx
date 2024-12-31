/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconErrorCircle = ({color = 'error', size, width, height, ...rest}: Omit<SvgProps, 'children'>) => {
  const {theme} = useTheme();
  const w = width ?? size ?? 20;
  const h = height ?? size ?? 20;
  const x = w / 20;
  const y = h / 20;

  return (
    <Svg size={size} width={w} height={h} {...rest}>
      <path
        d={`M${11 * x} ${11 * y}H${9 * x}V${5 * y}H${11 * x}M${11 * x} ${15 * y}H${9 * x}V${13 * y}H${11 * x}M${10 * x} ${0 * y}C${8.68678 * x} ${0 * y} ${7.38642 * x} ${0.258658 * y} ${6.17317 * x} ${0.761205 * y}C${4.95991 * x} ${1.26375 * y} ${3.85752 * x} ${2.00035 * y} ${2.92893 * x} ${2.92893 * y}C${1.05357 * x} ${4.8043 * y} ${0 * x} ${7.34784 * y} ${0 * x} ${10 * y}C${0 * x} ${12.6522 * y} ${1.05357 * x} ${15.1957 * y} ${2.92893 * x} ${17.0711 * y}C${3.85752 * x} ${17.9997 * y} ${4.95991 * x} ${18.7362 * y} ${6.17317 * x} ${19.2388 * y}C${7.38642 * x} ${19.7413 * y} ${8.68678 * x} ${20 * y} ${10 * x} ${20 * y}C${12.6522 * x} ${20 * y} ${15.1957 * x} ${18.9464 * y} ${17.0711 * x} ${17.0711 * y}C${18.9464 * x} ${15.1957 * y} ${20 * x} ${12.6522 * y} ${20 * x} ${10 * y}C${20 * x} ${8.68678 * y} ${19.7413 * x} ${7.38642 * y} ${19.2388 * x} ${6.17317 * y}C${18.7362 * x} ${4.95991 * y} ${17.9997 * x} ${3.85752 * y} ${17.0711 * x} ${2.92893 * y}C${16.1425 * x} ${2.00035 * y} ${15.0401 * x} ${1.26375 * y} ${13.8268 * x} ${0.761205 * y}C${12.6136 * x} ${0.258658 * y} ${11.3132 * x} ${0 * y} ${10 * x} ${0 * y}Z`}
        fill={theme.colors[color]}
      />
    </Svg>
  );
};
