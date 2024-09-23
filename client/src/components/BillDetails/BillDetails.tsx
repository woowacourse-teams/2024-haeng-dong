import {Icon, Text} from '@components/Design';
import Amount from '@components/Design/components/Amount/Amount';
import ListItem from '@components/Design/components/ListItem/ListItem';
import {css} from '@emotion/react';
import {BillDetail} from 'types/serviceType';

interface Props {
  billDetails: BillDetail[];
}

const BillDetails = ({billDetails}: Props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-inline: 0.5rem;
      `}
    >
      {billDetails.map(billDetail => (
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-block: 0.5rem;
          `}
        >
          <Text>{billDetail.memberName}</Text>
          <div
            css={css`
              display: flex;
              gap: 0.5rem;
            `}
          >
            <Amount amount={billDetail.price} />
            <Icon iconType="editPencil" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillDetails;
