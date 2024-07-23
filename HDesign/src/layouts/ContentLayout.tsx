import {PropsWithChildren} from 'react';
import {Flex} from '..';
type ContentLayoutBackground = 'white' | 'gray';

interface ContentLayoutProps extends PropsWithChildren {
  backgroundColor?: ContentLayoutBackground;
}

export const ContentLayout = ({backgroundColor, children}: ContentLayoutProps) => {
  return (
    <Flex
      backgroundColor={backgroundColor}
      justifyContent="flexStart"
      flexDirection="column"
      padding="0 1rem"
      gap="1rem"
      width="100%"
      height="100%"
    >
      {children}
    </Flex>
  );
};
