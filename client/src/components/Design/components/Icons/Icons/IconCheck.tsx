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
        d={`M${w * 0.75} ${h * 0.3}L${w * 0.375} ${h * 0.675}L${w * 0.25} ${h * 0.55}`}
        stroke={theme.colors[color]}
        stroke-width={w * 0.125}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
