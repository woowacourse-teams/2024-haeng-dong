import Image from '@components/Design/components/Image/Image';
import useRequestGetUserInfo from '@hooks/queries/user/useRequestGetUserInfo';

import usePageBackground from '@hooks/usePageBackground';

import getImageUrl from '@utils/getImageUrl';

import Nav from './Nav/Nav';
import {MainSection} from './Section/MainSection';
import {DescriptionSection} from './Section/DescriptionSection';
import {FeatureSection} from './Section/FeatureSection';
import {backgroundImageStyle, backgroundStyle, landingContainer} from './LandingPage.style';
import CreatorSection from './Section/CreatorSection/CreatorSection';

const LandingPage = () => {
  const {isVisible} = usePageBackground();
  const {userInfo} = useRequestGetUserInfo();
  const {isGuest} = userInfo;

  return (
    <div css={landingContainer}>
      <Nav isGuest={isGuest} />
      <MainSection isGuest={isGuest} />
      <DescriptionSection />
      <FeatureSection />
      <CreatorSection />
      <div css={backgroundStyle}>
        <Image
          css={backgroundImageStyle(isVisible)}
          src={getImageUrl('mainSectionBackground', 'webp')}
          alt=""
          fallbackSrc={getImageUrl('mainSectionBackground', 'png')}
        />
      </div>
    </div>
  );
};

export default LandingPage;
