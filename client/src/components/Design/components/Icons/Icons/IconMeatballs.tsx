/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {SvgProps} from '../Icon.type';
import Svg from '../Svg';

export const IconMeatballs = ({color = 'black', size, width, height, ...rest}: Omit<SvgProps, 'children'>) => {
  const {theme} = useTheme();
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;
  const x = w / 24;
  const y = h / 24;

  return (
    <Svg size={size} width={w} height={h} isUsingFill={true} {...rest}>
      <path
        d={`M${12 * x} ${18 * y}C${12.1989 * x} ${18 * y} ${12.3897 * x} ${17.921 * y} ${12.5303 * x} ${17.7803 * y}C${12.671 * x} ${17.6397 * y} ${12.75 * x} ${17.4489 * y} ${12.75 * x} ${17.25 * y}C${12.75 * x} ${17.0511 * y} ${12.671 * x} ${16.8603 * y} ${12.5303 * x} ${16.7197 * y}C${12.3897 * x} ${16.579 * y} ${12.1989 * x} ${16.5 * y} ${12 * x} ${16.5 * y}C${11.8011 * x} ${16.5 * y} ${11.6103 * x} ${16.579 * y} ${11.4697 * x} ${16.7197 * y}C${11.329 * x} ${16.8603 * y} ${11.25 * x} ${17.0511 * y} ${11.25 * x} ${17.25 * y}C${11.25 * x} ${17.4489 * y} ${11.329 * x} ${17.6397 * y} ${11.4697 * x} ${17.7803 * y}C${11.6103 * x} ${17.921 * y} ${11.8011 * x} ${18 * y} ${12 * x} ${18 * y}ZM${12 * x} ${12.75 * y}C${12.1989 * x} ${12.75 * y} ${12.3897 * x} ${12.671 * y} ${12.5303 * x} ${12.5303 * y}C${12.671 * x} ${12.3897 * y} ${12.75 * x} ${12.1989 * y} ${12.75 * x} ${12 * y}C${12.75 * x} ${11.8011 * y} ${12.671 * x} ${11.6103 * y} ${12.5303 * x} ${11.4697 * y}C${12.3897 * x} ${11.329 * y} ${12.1989 * x} ${11.25 * y} ${12 * x} ${11.25 * y}C${11.8011 * x} ${11.25 * y} ${11.6103 * x} ${11.329 * y} ${11.4697 * x} ${11.4697 * y}C${11.329 * x} ${11.6103 * y} ${11.25 * x} ${11.8011 * y} ${11.25 * x} ${12 * y}C${11.25 * x} ${12.1989 * y} ${11.329 * x} ${12.3897 * y} ${11.4697 * x} ${12.5303 * y}C${11.6103 * x} ${12.671 * y} ${11.8011 * x} ${12.75 * y} ${12 * x} ${12.75 * y}ZM${12 * x} ${7.5 * y}C${12.1989 * x} ${7.5 * y} ${12.3897 * x} ${7.42098 * y} ${12.5303 * x} ${7.28033 * y}C${12.671 * x} ${7.13968 * y} ${12.75 * x} ${6.94891 * y} ${12.75 * x} ${6.75 * y}C${12.75 * x} ${6.55109 * y} ${12.671 * x} ${6.36032 * y} ${12.5303 * x} ${6.21967 * y}C${12.3897 * x} ${6.07902 * y} ${12.1989 * x} ${6 * y} ${12 * x} ${6 * y}C${11.8011 * x} ${6 * y} ${11.6103 * x} ${6.07902 * y} ${11.4697 * x} ${6.21967 * y}C${11.329 * x} ${6.36032 * y} ${11.25 * x} ${6.55109 * y} ${11.25 * x} ${6.75 * y}C${11.25 * x} ${6.94891 * y} ${11.329 * x} ${7.13968 * y} ${11.4697 * x} ${7.28033 * y}C${11.6103 * x} ${7.42098 * y} ${11.8011 * x} ${7.5 * y} ${12 * x} ${7.5 * y}Z`}
        stroke={theme.colors[color]}
        stroke-width={Math.min(w, h) * 0.1}
        fill={theme.colors[color]}
      />
    </Svg>
  );
};
