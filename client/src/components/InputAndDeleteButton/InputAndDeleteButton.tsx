import {Icon, IconButton, LabelGroupInput} from 'haengdong-design';

import {InputAndDeleteButtonContainer} from './InputAndDeleteButton.style';

interface InputDeleteButtonProps {
  propsValue: string;
}

const InputAndDeleteButton = ({propsValue}: InputDeleteButtonProps) => {
  return (
    <div css={InputAndDeleteButtonContainer}>
      <div css={{flexGrow: 1}}>
        <LabelGroupInput.Element elementKey="e" value={propsValue} />
      </div>
      <IconButton variants="tertiary" size="medium">
        <Icon iconType="trash" iconColor="onTertiary" />
      </IconButton>
    </div>
  );
};

export default InputAndDeleteButton;
