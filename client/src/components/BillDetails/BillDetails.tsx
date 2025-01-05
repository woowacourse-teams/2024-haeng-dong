import {css} from '@emotion/react';
import {forwardRef} from 'react';

import EditableAmount from '@components/Design/components/Amount/EditableAmount';
import {BillDetail} from 'types/serviceType';

import {Text} from '@components/Design';

interface Props {
  billDetails: BillDetail[];
  onClickInput?: (id: number) => void;
  activatedId?: number;
}

const BillDetails = forwardRef<HTMLDivElement, Props>(({billDetails, onClickInput, activatedId}, ref) => {
  return (
    <div
      ref={ref}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-inline: 0.5rem;
      `}
    >
      {billDetails.map(billDetail => (
        <div
          key={billDetail.id}
          data-id={billDetail.id}
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-block: 0.5rem;
          `}
        >
          <Text size="bodyBold">{billDetail.memberName}</Text>

          <EditableAmount
            value={billDetail.price.toLocaleString('ko-kr')}
            onChange={() => {}}
            onClick={onClickInput ? () => onClickInput(billDetail.id) : undefined}
            isFixed={billDetail.isFixed}
            activated={activatedId === billDetail.id}
          />
        </div>
      ))}
    </div>
  );
});

export default BillDetails;
