/** @jsxImportSource @emotion/react */
import {useNavigate} from 'react-router-dom';

import Amount from '@components/Design/components/Amount/Amount';
import ChipGroup from '@components/Design/components/ChipGroup/ChipGroup';
import ListItem from '@components/Design/components/ListItem/ListItem';
import {Bill, Step as StepType} from 'types/serviceType';

import {Text} from '@components/Design';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import {css} from '@emotion/react';

interface Prop {
  step: StepType;
}

const Step = ({step}: Prop) => {
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();
  const handleClickStep = (bill: Bill) => {
    navigate(`/event/${eventId}/edit-bill`, {state: {bill}});
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
