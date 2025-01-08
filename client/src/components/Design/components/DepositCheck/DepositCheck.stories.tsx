import type {Meta, StoryObj} from '@storybook/react';

import DepositCheck from '@HDcomponents/DepositCheck/DepositCheck';

const meta = {
  title: 'Components/DepositCheck',
  component: DepositCheck,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    isDeposited: {
      description: '',
      control: {type: 'boolean'},
    },
  },
  args: {
    isDeposited: false,
  },
} satisfies Meta<typeof DepositCheck>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
