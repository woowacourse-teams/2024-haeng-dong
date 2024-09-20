import {Step as StepType} from 'types/serviceType';

import {Flex, Text} from '@HDesign/index';

import Step from './Step';

interface Props {
  data: StepType[];
}

const Steps = ({data}: Props) => {
  return (
    <Flex flexDirection="column" gap="0.5rem">
      {data.length > 0 ? (
        data.map(step => <Step step={step} />)
      ) : (
        <Flex width="100%" justifyContent="center">
          <Text size="body" textColor="gray" style={{paddingTop: '1rem'}}>
            지금은 지출 내역이 없어요. :(
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Steps;
