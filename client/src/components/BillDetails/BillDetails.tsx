import {Icon, Text} from '@components/Design';
import Amount from '@components/Design/components/Amount/Amount';
import EditableAmount from '@components/Design/components/Amount/EditableAmount';
import ListItem from '@components/Design/components/ListItem/ListItem';
import {css} from '@emotion/react';
import {useState} from 'react';
import {BillDetail} from 'types/serviceType';

interface Props {
  billDetails: BillDetail[];
  onClickInput: (id: number) => void;
  activatedId: number;
}

const BillDetails = ({billDetails, onClickInput, activatedId}: Props) => {
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

          <EditableAmount
            value={billDetail.price.toLocaleString('ko-kr')}
            onChange={() => {}}
            onClick={() => onClickInput(billDetail.id)}
            isFixed={billDetail.isFixed}
            activated={activatedId === billDetail.id}
          />
        </div>
      ))}
    </div>
  );
};

export default BillDetails;
