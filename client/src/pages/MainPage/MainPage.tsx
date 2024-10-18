import useAmplitude from '@hooks/useAmplitude';

import Nav from './Nav/Nav';
import {MainSection} from './Section/MainSection';
import {DescriptionSection} from './Section/DescriptionSection';
import {FeatureSection} from './Section/FeatureSection';
import {mainContainer} from './MainPage.style';

const MainPage = () => {
  const {trackStartCreateEvent} = useAmplitude();

  return (
    <div css={mainContainer}>
      <Nav trackStartCreateEvent={trackStartCreateEvent} />
      <MainSection trackStartCreateEvent={trackStartCreateEvent} />
      <DescriptionSection />
      <FeatureSection />
    </div>
  );
};

export default MainPage;
