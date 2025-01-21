import Image from '@components/Design/components/Image/Image';
import VStack from '@components/Design/components/Stack/VStack';

import {Text} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

const EventEmptyFallback = () => {
  return (
    <VStack align="center" gap="1rem" style={{width: '100%', height: '20rem'}}>
      <Image src={getImageUrl('standingDog', 'webp')} fallbackSrc={getImageUrl('standingDog', 'png')} width={150} />
      <Text
        size="bodyBold"
        css={{whiteSpace: 'pre-line', textAlign: 'center'}}
      >{`아래 행사 생성하기 버튼을 눌러\n 행사를 만들어주세요`}</Text>
    </VStack>
  );
};

export default EventEmptyFallback;
