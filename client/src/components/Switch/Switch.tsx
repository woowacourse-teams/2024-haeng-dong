import React from 'react';

import {buttonStyle, switchStyle} from './Switch.style';

interface SwitchProps {
  buttonList: string[];
  initialButton?: string;
  curSwitch: string;
  setSwitch: React.Dispatch<React.SetStateAction<string>>;
}

const Switch = ({buttonList, initialButton = buttonList[0], setSwitch, curSwitch}: SwitchProps) => {
  const handleButtonClick = (type: string) => {
    setSwitch(type);
  };

  return (
    <div css={switchStyle}>
      {buttonList.map(buttonName => (
        <button css={buttonStyle(curSwitch === buttonName)} onClick={() => handleButtonClick(buttonName)}>
          {buttonName}
        </button>
      ))}
    </div>
  );
};

export default Switch;
