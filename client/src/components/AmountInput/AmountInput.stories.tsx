/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import AmountInput from './AmountInput';

const meta = {
  title: 'Components/AmountInput',
  component: AmountInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {
    value: '112,000',
  },
} satisfies Meta<typeof AmountInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
