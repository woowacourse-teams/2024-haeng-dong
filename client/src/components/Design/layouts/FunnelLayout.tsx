import {Flex} from '..';

const FunnelLayout = ({children}: React.PropsWithChildren) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="flexStart"
      padding="1rem"
      paddingInline="1rem"
      gap="1rem"
      width="100%"
      height="100%"
    >
      {children}
    </Flex>
  );
};

export default FunnelLayout;
