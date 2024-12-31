/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconX = ({color = 'gray', size, width, height, ...rest}: Omit<SvgProps, 'children'>) => {
  const {theme} = useTheme();
  const w = width ?? size ?? 12;
  const h = height ?? size ?? 12;
  const x = w / 12;
  const y = h / 12;

  return (
    <Svg size={size} width={w} height={h} {...rest}>
      <path
        d={`M${9 * x} ${3 * y}L${3 * x} ${9 * y}M${3 * x} ${3 * y}L${9 * x} ${9 * y}`}
        stroke={theme.colors[color]}
        stroke-width={w * 0.133}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
