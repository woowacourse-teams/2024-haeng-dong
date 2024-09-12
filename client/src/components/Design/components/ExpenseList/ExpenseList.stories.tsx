/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import ExpenseList from '@HDcomponents/ExpenseList/ExpenseList';

const meta = {
  title: 'Components/ExpenseList',
  component: ExpenseList,
  tags: ['autodocs'],
  argTypes: {
    expenseList: {
      description: '',
    },
  },
  args: {
    expenseList: [
      {name: '소하', price: 2000},
      {name: '토다리', price: 2000},
      {name: '웨디', price: 1080},
      {name: '쿠키', price: 3020},
    ],
  },
} satisfies Meta<typeof ExpenseList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
