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
    name: '소하',
    onSearch: () => console.log('쿠키'),
    placeholder: '안녕',

    expenseList: [
      {name: '소하', price: 2000, clipboardText: '토스은행 2000원', onBankButtonClick: () => console.log('소하')},
      {name: '토다리', price: 2000, clipboardText: '토스은행 2000원', onBankButtonClick: () => console.log('토다리')},
      {name: '웨디', price: 1080, clipboardText: '토스은행 1080원', onBankButtonClick: () => console.log('웨디')},
      {name: '쿠키', price: 3020, clipboardText: '토스은행 3020원', onBankButtonClick: () => console.log('쿠키')},
    ],
  },
} satisfies Meta<typeof ExpenseList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
