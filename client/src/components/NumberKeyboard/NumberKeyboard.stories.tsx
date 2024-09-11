/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {useRef, useState} from 'react';

import {Flex, Input} from '@components/Design';

import NumberKeyboard from './NumberKeyboard';

const meta = {
  title: 'Components/NumberKeyboard',
  component: NumberKeyboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {description: '', control: {type: 'select'}, options: ['amount', 'number']},
  },
  args: {
    type: 'amount',
    maxNumber: 10000000,
    onChange: () => {},
  },
} satisfies Meta<typeof NumberKeyboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({type, maxNumber}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');
    return (
      <Flex flexDirection="column" gap="2rem" width="430px">
        <Input ref={inputRef} value={value} placeholder="금액을 입력하세요" />
        <NumberKeyboard type={type} maxNumber={maxNumber} onChange={setValue} />
      </Flex>
    );
  },
};
