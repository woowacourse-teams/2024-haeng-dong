import {PropsWithChildren} from 'react';

import {Flex} from '..';

type MainLayoutBackground = 'white' | 'gray' | 'lightGray';

interface MainLayoutProps extends PropsWithChildren {
  backgroundColor?: MainLayoutBackground;
}

export default function MainLayout({backgroundColor, children}: MainLayoutProps) {
  return (
    <Flex
      backgroundColor={backgroundColor}
      justifyContent="flexStart"
      flexDirection="column"
      padding="1rem 0 0 0"
      gap="0.5rem"
      width="100%"
      height="100%"
      minHeight="100vh"
    >
      {children}
    </Flex>
  );
}
