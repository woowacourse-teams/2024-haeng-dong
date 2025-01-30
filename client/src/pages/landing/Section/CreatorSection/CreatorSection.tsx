import {css} from '@emotion/react';

import Text from '@components/Design/components/Text/Text';

import useAmplitude from '@hooks/useAmplitude';

import Avatar from './Avatar';
import {avatarContainerStyle, partStyle, sectionStyle} from './CreatorSection.style';
import InViewportTrigger from './InViewportTrigger';

const CreatorSection = () => {
  const frontEndDevelopers = [
    {imagePath: 'todari', name: '토다리', navigateUrl: 'https://github.com/Todari'},
    {imagePath: 'cookie', name: '쿠키', navigateUrl: 'https://github.com/jinhokim98'},
    {imagePath: 'soha', name: '소하', navigateUrl: 'https://github.com/soi-ha'},
    {imagePath: 'weadie', name: '웨디', navigateUrl: 'https://github.com/pakxe'},
  ];
  const backEndDevelopers = [
    {imagePath: '2sang', name: '이상', navigateUrl: 'https://github.com/kunsanglee'},
    {imagePath: 'baekho', name: '백호', navigateUrl: 'https://github.com/Arachneee'},
    {imagePath: 'mangcho', name: '망쵸', navigateUrl: 'https://github.com/3Juhwan'},
    {imagePath: 'gamja', name: '감자', navigateUrl: 'https://github.com/khabh'},
  ];

  const {trackViewLandingPageBottom} = useAmplitude();

  return (
    <InViewportTrigger callback={trackViewLandingPageBottom} css={sectionStyle}>
      <Text size="subTitle" textColor="white" responsive={true}>
        행동대장을 만든 행동대장들
      </Text>
      <div css={partStyle}>
        <Text size="bodyBold" textColor="white" responsive={true}>
          FRONTEND
        </Text>
        <div css={avatarContainerStyle}>
          {frontEndDevelopers.map(developer => (
            <Avatar key={developer.imagePath} {...developer} />
          ))}
        </div>
      </div>
      <div
        css={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        })}
      >
        <Text size="bodyBold" textColor="white" responsive={true}>
          BACKEND
        </Text>
        <div css={avatarContainerStyle}>
          {backEndDevelopers.map(developer => (
            <Avatar key={developer.imagePath} {...developer} />
          ))}
        </div>
      </div>
    </InViewportTrigger>
  );
};

export default CreatorSection;
