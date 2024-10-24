import Image from '@components/Design/components/Image/Image';

import {Flex, MainLayout, Text} from '@HDesign/index';

import getImageUrl from '@utils/getImageUrl';

const ErrorPage = () => {
  return (
    <MainLayout>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="1rem"
        height="80vh"
        css={{alignContent: 'center'}}
      >
        <Image src={getImageUrl('cryingDog', 'webp')} width="160px" />
        <Text size="subTitle">알 수 없는 오류가 발생했습니다.</Text>
        <Text size="body" css={{textAlign: 'center'}}>
          계속 발생한다면 잠시 후 다시 시도해주세요. <br />
          인터넷 연결 상태가 좋지 않으면 발생할 수 있습니다.
        </Text>
      </Flex>
    </MainLayout>
  );
};

export default ErrorPage;
