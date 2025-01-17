/** @jsxImportSource @emotion/react */

import TextButton from '../TextButton/TextButton';
import Text from '../Text/Text';

import {ContentLabelProps} from './ContentLabel.type';

const ContentLabel = ({label, onClick}: ContentLabelProps) => {
  return typeof onClick !== 'undefined' ? (
    <TextButton textColor="gray" textSize="caption" onClick={onClick}>
      {label}
    </TextButton>
  ) : (
    <Text size="caption" textColor="gray">
      {label}
    </Text>
  );
};

export default ContentLabel;
