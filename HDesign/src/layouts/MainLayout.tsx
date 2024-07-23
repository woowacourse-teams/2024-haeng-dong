import {PropsWithChildren} from 'react';
import {Flex} from '..';
import {useTheme} from '@/theme/HDesignProvider';
type MainLayoutBackground = 'white' | 'gray';

interface MainLayoutProps extends PropsWithChildren {
  backgroundColor?: MainLayoutBackground;
}

export const MainLayout = ({backgroundColor, children}: MainLayoutProps) => {
  const {theme} = useTheme();
  return (
    <Flex
      backgroundColor={backgroundColor}
      justifyContent="flexStart"
      flexDirection="column"
      margin="1rem 0 0 0"
      gap="1rem"
      width="100%"
      height="100%"
    >
      {children}
    </Flex>
  );
};
