/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconXCircle = ({color = 'gray', size, width, height}: Omit<SvgProps, 'children'>) => {
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
        d={`M${10 * x} ${20 * y}C${15.5228 * x} ${20 * y} ${20 * x} ${15.5228 * y} ${20 * x} ${10 * y}C${20 * x} ${4.47715 * y} ${15.5228 * x} ${0 * y} ${10 * x} ${0 * y}C${4.47715 * x} ${0 * y} ${0 * x} ${4.47715 * y} ${0 * x} ${10 * y}C${0 * x} ${15.5228 * y} ${4.47715 * x} ${20 * y} ${10 * x} ${20 * y}ZM${6.70711 * x} ${5.29289 * y}C${6.31658 * x} ${4.90237 * y} ${5.68342 * x} ${4.90237 * y} ${5.29289 * x} ${5.29289 * y}C${4.90237 * x} ${5.68342 * y} ${4.90237 * x} ${6.31658 * y} ${5.29289 * x} ${6.70711 * y}L${8.58579 * x} ${10 * y}L${5.29289 * x} ${13.2929 * y}C${4.90237 * x} ${13.6834 * y} ${4.90237 * x} ${14.3166 * y} ${5.29289 * x} ${14.7071 * y}C${5.68342 * x} ${15.0976 * y} ${6.31658 * x} ${15.0976 * y} ${6.70711 * x} ${14.7071 * y}L${10 * x} ${11.4142 * y}L${13.2929 * x} ${14.7071 * y}C${13.6834 * x} ${15.0976 * y} ${14.3166 * x} ${15.0976 * y} ${14.7071 * x} ${14.7071 * y}C${15.0976 * x} ${14.3166 * y} ${15.0976 * x} ${13.6834 * y} ${14.7071 * x} ${13.2929 * y}L${11.4142 * x} ${10 * y}L${14.7071 * x} ${6.70711 * y}C${15.0976 * x} ${6.31658 * y} ${15.0976 * x} ${5.68342 * y} ${14.7071 * x} ${5.29289 * y}C${14.3166 * x} ${4.90237 * y} ${13.6834 * x} ${4.90237 * y} ${13.2929 * x} ${5.29289 * y}L${10 * x} ${8.58579 * y}L${6.70711 * x} ${5.29289 * y}Z`}
        fill={theme.colors[color]}
      />
    </Svg>
  );
};
