/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

type direction = 'up' | 'down' | 'left' | 'right';

export const IconChevron = ({
  color = 'tertiary',
  size,
  width,
  height,
  direction = 'down',
  ...rest
}: Omit<SvgProps, 'children'> & {direction?: direction}) => {
  const {theme} = useTheme();
  const w = width ?? size ?? 16;
  const h = height ?? size ?? 16;

  const getRotation = () => {
    switch (direction) {
      case 'up':
        return 180;
      case 'left':
        return 90;
      case 'right':
        return 270;
      default:
        return 0;
    }
  };

  return (
    <Svg size={size} width={w} height={h} {...rest}>
      <g transform={`rotate(${getRotation()}, ${w / 2}, ${h / 2})`}>
        <path
          d={`M${w * 0.9} ${h * 0.33}L${w * 0.5} ${h * 0.66}L${w * 0.1} ${h * 0.33}`}
          stroke={theme.colors[color]}
          stroke-width={Math.min(w, h) * 0.1}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </Svg>
  );
};
