/** @jsxImportSource @emotion/react */
import {useMatch, useNavigate} from 'react-router-dom';
import {css} from '@emotion/react';

import Amount from '@components/Design/components/Amount/Amount';
import ChipGroup from '@components/Design/components/ChipGroup/ChipGroup';
import ListItem from '@components/Design/components/ListItem/ListItem';
import {Bill, Step as StepType} from 'types/serviceType';

import {Text} from '@components/Design';

import getEventIdByUrl from '@utils/getEventIdByUrl';

interface Prop {
  step: StepType;
  isAdmin: boolean;
}

const Step = ({step, isAdmin}: Prop) => {
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();
  const handleClickStep = (bill: Bill) => {
    if (isAdmin) navigate(`/event/${eventId}/admin/edit-bill`, {state: {bill}});
  };

  return (
    <ListItem>
      <ListItem.Row>
        <ChipGroup color="gray" texts={step.members.map(member => member.name)} />

        <Text
          size="caption"
          textColor="gray"
          css={css`
            flex-shrink: 0;
            width: 2rem;
            text-align: end;
            margin-left: 0.5rem;
          `}
        >
          {step.members.length}명
        </Text>
      </ListItem.Row>
      {step.bills.map(bill => {
        return (
          <ListItem.Row onClick={() => handleClickStep(bill)}>
            <Text size="bodyBold">{bill.title}</Text>
            <Amount amount={bill.price} />
          </ListItem.Row>
        );
      })}
    </ListItem>
  );
};

export default Step;
