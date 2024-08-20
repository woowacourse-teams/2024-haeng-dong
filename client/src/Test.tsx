import {EditableItem, Flex, Text} from 'haengdong-design';

const Test = () => {
  return (
    <EditableItem backgroundColor="lightGrayContainer" onBlur={() => {}} onFocus={() => {}}>
      <EditableItem.Input placeholder="지출 내역" textSize="bodyBold" />
      <Flex alignItems="center" gap="0.25rem">
        <EditableItem.Input
          placeholder="0"
          style={{
            textAlign: 'right',
          }}
          type="number"
        />
        <Text size="caption">원</Text>
      </Flex>
    </EditableItem>
  );
};

export default Test;
