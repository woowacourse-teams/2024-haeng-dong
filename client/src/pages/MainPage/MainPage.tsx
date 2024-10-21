import useAmplitude from '@hooks/useAmplitude';

import Nav from './Nav/Nav';
import {MainSection} from './Section/MainSection';
import {DescriptionSection} from './Section/DescriptionSection';
import {FeatureSection} from './Section/FeatureSection';
import {mainContainer} from './MainPage.style';
import CreatorSection from './Section/FeatureSection/CreatorSection/CreatorSection';
import useMainPageYScroll from '@hooks/useMainPageYScroll';

const MainPage = () => {
  const {trackStartCreateEvent} = useAmplitude();
  const {featureSectionRef} = useMainPageYScroll();
  return (
    <div css={mainContainer}>
      <Nav trackStartCreateEvent={trackStartCreateEvent} />
      <MainSection trackStartCreateEvent={trackStartCreateEvent} />
      <DescriptionSection />
      <FeatureSection ref={featureSectionRef} />
      <CreatorSection />
    </div>
  );
};

export default MainPage;
