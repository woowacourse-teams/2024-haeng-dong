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
      {name: '소하', price: 2000, onBankButtonClick: () => console.log('')},
      {name: '토다리', price: 2000, onBankButtonClick: () => console.log('')},
      {name: '웨디', price: 1080, onBankButtonClick: () => console.log('')},
      {name: '쿠키', price: 3020, onBankButtonClick: () => console.log('')},
    ],
  },
} satisfies Meta<typeof ExpenseList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
