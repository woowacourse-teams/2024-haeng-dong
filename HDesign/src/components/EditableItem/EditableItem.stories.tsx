/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import EditableItem from '@components/EditableItem/EditableItem';
import Flex from '@components/Flex/Flex';
import Text from '@components/Text/Text';

const meta = {
  title: 'Components/EditableItem',
  component: EditableItem,
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    backgroundColor: {
      description: '',
      control: {type: 'select'},
    },
  },
  args: {
    backgroundColor: 'lightGrayContainer',
  },
} satisfies Meta<typeof EditableItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => {
    return (
      <EditableItem
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <EditableItem.Input placeholder="지출 내역" textSize="bodyBold"></EditableItem.Input>
        <Flex gap="0.25rem" alignItems="center">
          <EditableItem.Input placeholder="0" type="number" style={{textAlign: 'right'}}></EditableItem.Input>
          <Text size="caption">원</Text>
        </Flex>
      </EditableItem>
    );
  },
};

export const WithLabel: Story = {
  render: ({...args}) => {
    return (
      <EditableItem
        prefixLabelText="라벨"
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <EditableItem.Input placeholder="지출 내역" textSize="bodyBold"></EditableItem.Input>
        <Flex gap="0.25rem" alignItems="center">
          <EditableItem.Input placeholder="0" type="number" style={{textAlign: 'right'}}></EditableItem.Input>
          <Text size="caption">원</Text>
        </Flex>
      </EditableItem>
    );
  },
};

export const WithLabels: Story = {
  render: ({...args}) => {
    return (
      <EditableItem
        prefixLabelText="왼쪽 라벨"
        suffixLabelText="오른쪽 라벨"
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <EditableItem.Input placeholder="지출 내역" textSize="bodyBold"></EditableItem.Input>
        <Flex gap="0.25rem" alignItems="center">
          <EditableItem.Input placeholder="0" type="number" style={{textAlign: 'right'}}></EditableItem.Input>
          <Text size="caption">원</Text>
        </Flex>
      </EditableItem>
    );
  },
};

export const ListView: Story = {
  render: ({...args}) => {
    return (
      <EditableItem
        prefixLabelText="라벨"
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <Flex flexDirection="column" width="100%" gap="1rem">
          {new Array(5).fill(0).map(() => (
            <Flex justifyContent="spaceBetween">
              <EditableItem.Input placeholder="지출 내역" textSize="bodyBold"></EditableItem.Input>
              <Flex gap="0.25rem" alignItems="center">
                <EditableItem.Input placeholder="0" type="number" style={{textAlign: 'right'}}></EditableItem.Input>
                <Text size="caption">원</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </EditableItem>
    );
  },
};
