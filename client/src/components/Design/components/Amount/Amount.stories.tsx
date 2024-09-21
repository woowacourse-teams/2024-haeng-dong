/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Amount from '@HDcomponents/Amount/Amount';

const meta = {
  title: 'Components/Amount',
  component: Amount,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    amount: {
      description: '',
      control: {type: 'number'},
    },
  },
  args: {
    amount: 112000,
  },
} satisfies Meta<typeof Amount>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
