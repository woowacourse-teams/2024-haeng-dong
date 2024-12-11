/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import Image from '../Image/Image';

import {profileContainerStyle} from './Profile.style';
import {ProfileProps} from './Profile.type';

export const Profile = ({size = 28, ...profileProps}: ProfileProps) => {
  const {theme} = useTheme();

  return <Image aria-label="프로필 이미지" {...profileProps} css={profileContainerStyle(theme, size)} />;
};
