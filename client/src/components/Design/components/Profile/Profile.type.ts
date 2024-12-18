import {ImageProps} from '../Image/Image';

export type ProfileSize = 'small' | 'medium' | 'large';

export type ProfileProps = ImageProps & {
  size?: ProfileSize;
};
