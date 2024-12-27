import {useNavigate} from 'react-router-dom';

import Image from '@components/Design/components/Image/Image';

import {Button, Flex, Text} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

const MyPageError = () => {
  const navigate = useNavigate();

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" gap="1.5rem">
      <Image src={getImageUrl('cryingDog', 'webp')} fallbackSrc={getImageUrl('cryingDog', 'png')} width={200} />
      <Text
        size="bodyBold"
        css={{whiteSpace: 'pre-line', textAlign: 'center'}}
      >{`로그인 후\n사용할 수 있는 서비스입니다.`}</Text>
      <Button onClick={() => navigate(-1)}>이전으로 돌아가기</Button>
    </Flex>
  );
};

export default MyPageError;
