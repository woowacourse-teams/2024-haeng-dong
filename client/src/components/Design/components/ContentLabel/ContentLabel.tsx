/** @jsxImportSource @emotion/react */

import TextButton from '../TextButton/TextButton';
import Text from '../Text/Text';

import {ContentLabelProps} from './ContentLabel.type';

const ContentLabel = ({children, onClick}: ContentLabelProps) => {
  return typeof onClick !== 'undefined' ? (
    <TextButton textColor="gray" textSize="caption" onClick={onClick}>
      {children}
    </TextButton>
  ) : (
    <Text size="caption" textColor="gray">
      {children}
    </Text>
  );
};

export default ContentLabel;
