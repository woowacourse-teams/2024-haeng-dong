import {Flex} from '@components/Design';

type ContainerProps = React.PropsWithChildren;

const Container = ({children}: ContainerProps) => {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      gap="0.5rem"
      backgroundColor="white"
      padding="1rem"
      css={{borderRadius: '0.75rem'}}
    >
      {children}
    </Flex>
  );
};

export default Container;
