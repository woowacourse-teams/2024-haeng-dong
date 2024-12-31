/** @jsxImportSource @emotion/react */
import {IconChevron} from '../Icons/Icons/IconChevron';
import {chevronStyle, activeChevronStyle} from './Chevron.style';

type ChevronProps = {
  isActive: boolean;
};

const Chevron = ({isActive}: ChevronProps) => {
  return (
    <div>
      <IconChevron size={16} color="gray" css={[chevronStyle, isActive && activeChevronStyle]} />
    </div>
  );
};

export default Chevron;
