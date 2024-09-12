/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import BankSelect from './BankSelect';

const meta = {
  title: 'Components/BankSelect',
  component: BankSelect,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {},
  args: {
    onSelect: (name: string) => alert(name),
  },
} satisfies Meta<typeof BankSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
