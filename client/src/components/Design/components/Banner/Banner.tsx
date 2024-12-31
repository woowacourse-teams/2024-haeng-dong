/** @jsxImportSource @emotion/react */
import type {BannerProps} from './Banner.type';

import Flex from '../Flex/Flex';
import Icon from '../Icons/Icon';
import IconButton from '../IconButton/IconButton';
import Text from '../Text/Text';
import Button from '../Button/Button';

const Banner = ({title, description, buttonText, onDelete, ...buttonProps}: BannerProps) => {
  return (
    <Flex
      justifyContent="spaceBetween"
      alignItems="center"
      width="100%"
      padding="0.5rem"
      paddingInline="0.5rem"
      backgroundColor="white"
      cssProp={{borderRadius: '0.75rem'}}
    >
      <Flex gap="0.5rem">
        <IconButton
          variants="none"
          onClick={onDelete}
          style={{display: 'flex', alignItems: 'flex-start'}}
          aria-label="배너 닫기"
        >
          <Icon iconType="x" />
        </IconButton>
        <div>
          <Text size="captionBold" color="onTertiary">
            {title}
          </Text>
          {description && (
            <Text size="tiny" color="onTertiary">
              {description}
            </Text>
          )}
        </div>
      </Flex>
      <Button variants="tertiary" size="small" {...buttonProps}>
        {buttonText}
      </Button>
    </Flex>
  );
};

export default Banner;
