import useAmplitude from '@hooks/useAmplitude';

import Nav from './Nav/Nav';
import {MainSection} from './Section/MainSection';
import {DescriptionSection} from './Section/DescriptionSection';
import {FeatureSection} from './Section/FeatureSection';
import {backgroundImageStyle, backgroundStyle, mainContainer} from './MainPage.style';
import CreatorSection from './Section/CreatorSection/CreatorSection';
import getImageUrl from '@utils/getImageUrl';
import Image from '@components/Design/components/Image/Image';
import usePageBackground from '@hooks/usePageBackground';

const MainPage = () => {
  const {trackStartCreateEvent} = useAmplitude();
  const {isVisible} = usePageBackground();
  return (
    <div css={mainContainer}>
      <Nav trackStartCreateEvent={trackStartCreateEvent} />
      <MainSection trackStartCreateEvent={trackStartCreateEvent} />
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

export default MainPage;
