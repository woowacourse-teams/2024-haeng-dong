/** @jsxImportSource @emotion/react */
import {chevronStyle, activeChevronStyle} from './Chevron.style';

type ChevronProps = {
  isActive: boolean;
};

const Chevron = ({isActive}: ChevronProps) => {
  return (
    <div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        css={[chevronStyle, isActive && activeChevronStyle]}
      >
        <path d="M4 7L10 13L16 7" stroke="#B2B1B6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Chevron;
