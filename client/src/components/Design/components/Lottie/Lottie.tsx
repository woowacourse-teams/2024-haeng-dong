/** @jsxImportSource @emotion/react */

import {PRIMARY_COLORS} from '@components/Design/token/colors';

import {lottieContainerStyle, lottieStyle} from './Lottie.style';

const Lottie = () => {
  const frameColors = [PRIMARY_COLORS[100], PRIMARY_COLORS[200], PRIMARY_COLORS[300], PRIMARY_COLORS[400]];

  return (
    <div css={lottieContainerStyle}>
      <div css={lottieStyle(frameColors)}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Lottie;
