import {PropsWithChildren} from 'react';
import {Flex} from '..';

interface MainLayoutInterface extends PropsWithChildren {}

export const MainLayout = ({children}: MainLayoutInterface) => {
  return (
    <Flex justifyContent="flexStart" flexDirection="column" margin="1rem 0 0 0" gap="1rem" width="100%" height="100%">
      {children}
    </Flex>
  );
};
