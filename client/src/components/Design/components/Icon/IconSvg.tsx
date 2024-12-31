import {SvgProps} from './Icon.type';

const IconSvg: React.FC<SvgProps> = ({children, color, height, isUsingFill = false, size, viewBox, width, ...rest}) => {
  return (
    <svg
      fill={isUsingFill ? color ?? 'currentColor' : 'none'}
      height={size ?? height ?? 24}
      viewBox={viewBox ?? `0 0 ${size ?? width ?? 24} ${size ?? height ?? 24}`}
      width={size ?? width ?? 24}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};

export default IconSvg;
