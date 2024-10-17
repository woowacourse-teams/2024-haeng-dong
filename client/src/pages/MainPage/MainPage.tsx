import useAmplitude from '@hooks/useAmplitude';

import Nav from './Nav/Nav';
import MainSection from './Section/MainSection';
import DescriptionSection from './Section/DescriptionSection';
import AddBillSection from './Section/AddBillSection';

import {css} from '@emotion/react';
import FeatureSection from './Section/FeatureSection';

const MainPage = () => {
  const {trackStartCreateEvent} = useAmplitude();

  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      })}
    >
      <div
        css={css({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem 0',
          width: '100%',
          backgroundColor: 'white',
        })}
      >
        <div css={css({maxWidth: '1200px', width: '100%'})}>
          <Nav trackStartCreateEvent={trackStartCreateEvent} />
        </div>
      </div>
      <MainSection trackStartCreateEvent={trackStartCreateEvent} />
      <DescriptionSection />
      <FeatureSection />
    </div>
  );
};

export default MainPage;
