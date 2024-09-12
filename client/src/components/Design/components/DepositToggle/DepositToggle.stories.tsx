import type {Meta, StoryObj} from '@storybook/react';

import {DepositToggle} from './DepositToggle';

const meta = {
  title: 'Components/DepositToggle',
  component: DepositToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isDeposit: {
      description: '',
      control: {type: 'boolean'},
    },
    onToggle: {
      description: '',
      control: {type: 'select'},
      options: [undefined, () => alert('change toggle')],
    },
  },
  args: {
    isDeposit: false,
    onToggle: () => alert('change toggle'),
  },
} satisfies Meta<typeof DepositToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
