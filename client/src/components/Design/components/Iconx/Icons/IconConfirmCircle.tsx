/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconConfirmCircle = ({color = 'complete', size, width, height}: Omit<SvgProps, 'children'>) => {
  const {theme} = useTheme();
  const w = width ?? size ?? 20;
  const h = height ?? size ?? 20;
  const x = w / 20;
  const y = h / 20;

  return (
    <Svg size={size} width={w} height={h}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d={`M${10 * x} ${20 * y}C${11.3132 * x} ${20 * y} ${12.6136 * x} ${19.7413 * y} ${13.8268 * x} ${19.2388 * y}C${15.0401 * x} ${18.7362 * y} ${16.1425 * x} ${17.9997 * y} ${17.0711 * x} ${17.0711 * y}C${17.9997 * x} ${16.1425 * y} ${18.7362 * x} ${15.0401 * y} ${19.2388 * x} ${13.8268 * y}C${19.7413 * x} ${12.6136 * y} ${20 * x} ${11.3132 * y} ${20 * x} ${10 * y}C${20 * x} ${8.68678 * y} ${19.7413 * x} ${7.38642 * y} ${19.2388 * x} ${6.17317 * y}C${18.7362 * x} ${4.95991 * y} ${17.9997 * x} ${3.85752 * y} ${17.0711 * x} ${2.92893 * y}C${16.1425 * x} ${2.00035 * y} ${15.0401 * x} ${1.26375 * y} ${13.8268 * x} ${0.761205 * y}C${12.6136 * x} ${0.258658 * y} ${11.3132 * x} ${-1.95685e-8 * y} ${10 * x} ${0 * y}C${7.34784 * x} ${3.95203e-8 * y} ${4.8043 * x} ${1.05357 * y} ${2.92893 * x} ${2.92893 * y}C${1.05357 * x} ${4.8043 * y} ${0 * x} ${7.34784 * y} ${0 * x} ${10 * y}C${0 * x} ${12.6522 * y} ${1.05357 * x} ${15.1957 * y} ${2.92893 * x} ${17.0711 * y}C${4.8043 * x} ${18.9464 * y} ${7.34784 * x} ${20 * y} ${10 * x} ${20 * y}ZM${15.2978 * x} ${7.37778 * y}C${15.3953 * x} ${7.26627 * y} ${15.4696 * x} ${7.13638 * y} ${15.5162 * x} ${6.99574 * y}C${15.5628 * x} ${6.85511 * y} ${15.5808 * x} ${6.70657 * y} ${15.5692 * x} ${6.55887 * y}C${15.5575 * x} ${6.41117 * y} ${15.5165 * x} ${6.26729 * y} ${15.4484 * x} ${6.1357 * y}C${15.3804 * x} ${6.0041 * y} ${15.2866 * x} ${5.88745 * y} ${15.1728 * x} ${5.7926 * y}C${15.059 * x} ${5.69775 * y} ${14.9274 * x} ${5.62663 * y} ${14.7857 * x} ${5.5834 * y}C${14.644 * x} ${5.54018 * y} ${14.495 * x} ${5.52574 * y} ${14.3476 * x} ${5.54092 * y}C${14.2003 * x} ${5.5561 * y} ${14.0574 * x} ${5.60061 * y} ${13.9275 * x} ${5.67181 * y}C${13.7976 * x} ${5.74302 * y} ${13.6832 * x} ${5.83949 * y} ${13.5911 * x} ${5.95556 * y}L${9.59333 * x} ${10.7522 * y}C${9.20778 * x} ${11.2144 * y} ${8.99111 * x} ${11.4711 * y} ${8.81889 * x} ${11.6278 * y}L${8.81222 * x} ${11.6344 * y}L${8.80444 * x} ${11.6289 * y}C${8.61778 * x} ${11.4878 * y} ${8.37889 * x} ${11.2522 * y} ${7.95445 * x} ${10.8267 * y}L${6.34111 * x} ${9.21445 * y}C${6.13155 * x} ${9.01205 * y} ${5.85088 * x} ${8.90005 * y} ${5.55956 * x} ${8.90259 * y}C${5.26823 * x} ${8.90512 * y} ${4.98954 * x} ${9.02197 * y} ${4.78354 * x} ${9.22798 * y}C${4.57753 * x} ${9.43399 * y} ${4.46067 * x} ${9.71267 * y} ${4.45814 * x} ${10.004 * y}C${4.45561 * x} ${10.2953 * y} ${4.5676 * x} ${10.576 * y} ${4.77 * x} ${10.7856 * y}L${6.38222 * x} ${12.3978 * y}L${6.42778 * x} ${12.4433 * y}C${6.79111 * x} ${12.8067 * y} ${7.13889 * x} ${13.1556 * y} ${7.46445 * x} ${13.4011 * y}C${7.82778 * x} ${13.6767 * y} ${8.30444 * x} ${13.9344 * y} ${8.91444 * x} ${13.9078 * y}C${9.52556 * x} ${13.88 * y} ${9.97667 * x} ${13.5789 * y} ${10.3144 * x} ${13.2722 * y}C${10.6144 * x} ${12.9978 * y} ${10.9311 * x} ${12.6189 * y} ${11.2589 * x} ${12.2244 * y}L${11.3 * x} ${12.1756 * y}L${15.2978 * x} ${7.37778 * y}Z`}
        fill={theme.colors[color]}
      />
    </Svg>
  );
};
