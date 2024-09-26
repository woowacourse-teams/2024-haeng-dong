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
    memberName: '소하',
    onSearch: () => console.log('쿠키'),
    placeholder: '안녕',

    expenseList: [
      {
        memberId: 1,
        memberName: '소하',
        price: 2000,
        isDeposited: true,
        clipboardText: '토스은행 2000원',
        onBankButtonClick: () => console.log('소하'),
      },
      {
        memberId: 2,
        memberName: '토다리',
        price: 2000,
        isDeposited: false,
        clipboardText: '토스은행 2000원',
        onBankButtonClick: () => console.log('토다리'),
      },
      {
        memberId: 3,
        memberName: '웨디',
        price: 1080,
        isDeposited: true,
        clipboardText: '토스은행 1080원',
        onBankButtonClick: () => console.log('웨디'),
      },
      {
        memberId: 4,
        memberName: '쿠키',
        price: 3020,
        isDeposited: false,
        clipboardText: '토스은행 3020원',
        onBankButtonClick: () => console.log('쿠키'),
      },
    ],
  },
} satisfies Meta<typeof ExpenseList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
