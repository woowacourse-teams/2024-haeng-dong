import Image from '@components/Design/components/Image/Image';

import {Flex, Text} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

const MyPageLoading = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" gap="1.5rem">
      <Image src={getImageUrl('runningDog', 'webp')} fallbackSrc={getImageUrl('runningDog', 'png')} width={200} />
      <Text
        size="bodyBold"
        css={{whiteSpace: 'pre-line', textAlign: 'center'}}
      >{`로딩중입니다.\n 잠시만 기다려주세요.`}</Text>
    </Flex>
  );
};

export default MyPageLoading;
