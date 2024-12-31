/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconKakao = ({color = 'onKakao', size, width, height}: Omit<SvgProps, 'children'>) => {
  const {theme} = useTheme();
  const w = width ?? size ?? 21;
  const h = height ?? size ?? 20;
  const x = w / 21;
  const y = h / 20;

  return (
    <Svg size={size} width={w} height={h}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d={`M${0.5 * x} ${9.00012 * y}C${0.5 * x} ${4.14312 * y} ${5.156 * x} ${0.500122 * y} ${10.5 * x} ${0.500122 * y}C${15.844 * x} ${0.500122 * y} ${20.5 * x} ${4.14312 * y} ${20.5 * x} ${9.00012 * y}C${20.5 * x} ${13.8571 * y} ${15.844 * x} ${17.5001 * y} ${10.5 * x} ${17.5001 * y}C${9.974 * x} ${17.5001 * y} ${9.45867 * x} ${17.4668 * y} ${8.954 * x} ${17.4001 * y}L${6.054 * x} ${19.3321 * y}C${5.88945 * x} ${19.4417 * y} ${5.6961 * x} ${19.5001 * y} ${5.49839 * x} ${19.4998 * y}C${5.30068 * x} ${19.4996 * y} ${5.10749 * x} ${19.4407 * y} ${4.94321 * x} ${19.3307 * y}C${4.77894 * x} ${19.2207 * y} ${4.65097 * x} ${19.0645 * y} ${4.57546 * x} ${18.8817 * y}C${4.49995 * x} ${18.699 * y} ${4.48031 * x} ${18.498 * y} ${4.519 * x} ${18.3041 * y}L${4.964 * x} ${16.0831 * y}C${2.328 * x} ${14.5901 * y} ${0.5 * x} ${12.0171 * y} ${0.5 * x} ${9.00012 * y}Z`}
        fill={theme.colors[color]}
      />
    </Svg>
  );
};
