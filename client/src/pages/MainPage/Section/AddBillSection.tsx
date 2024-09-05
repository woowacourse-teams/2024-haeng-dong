import {css} from '@emotion/react';

import {Text} from '@HDesign/index';
import AddBillMockup from '@assets/image/addBillMockup.svg';

const AddBillSection = () => {
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem',
        gap: '2rem',
        width: '100%',
        backgroundColor: 'white',
      })}
    >
      <div css={css({display: 'flex', flexDirection: 'column', gap: '1rem'})}>
        <Text size="subTitle">지출내역을 쉽게 추가하세요</Text>
        <Text size="body" textColor="gray">
          {`나중에 한번에 기록할 수도 있지만,
          실시간으로 기록해 놓을 수 있어요`}
        </Text>
      </div>
      <AddBillMockup />
    </div>
  );
};

export default AddBillSection;
