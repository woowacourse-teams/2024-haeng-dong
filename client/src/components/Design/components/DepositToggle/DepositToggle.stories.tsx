import type {Meta, StoryObj} from '@storybook/react';

import {DepositToggle} from './DepositToggle';

const meta = {
  title: 'Components/DepositToggle',
  component: DepositToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof DepositToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
