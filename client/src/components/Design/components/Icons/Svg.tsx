/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import {SvgProps} from './Icon.type';

const Svg: React.FC<SvgProps> = ({children, color, height, isUsingFill = false, size, viewBox, width, ...rest}) => {
  const {theme} = useTheme();

  return (
    <svg
      fill={isUsingFill ? (color ? theme.colors[color] : 'currentColor') : 'none'}
      height={height ?? size ?? 24}
      viewBox={viewBox ?? `0 0 ${width ?? size ?? 24} ${height ?? size ?? 24}`}
      width={width ?? size ?? 24}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};

export default Svg;
