/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconCheck = ({color = 'primary', size, width, height, ...rest}: Omit<SvgProps, 'children'>) => {
  const {theme} = useTheme();
  const w = width ?? size ?? 16;
  const h = height ?? size ?? 16;

  return (
    <Svg size={size} width={w} height={h} {...rest}>
      <path
        d={`M${w * 0.75} ${h * 0.25}L${w * 0.375} ${h * 0.625}L${w * 0.25} ${h * 0.5}`}
        stroke={theme.colors[color]}
        stroke-width={size ? size * 0.1 : width ? width * 0.1 : 1.6}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
