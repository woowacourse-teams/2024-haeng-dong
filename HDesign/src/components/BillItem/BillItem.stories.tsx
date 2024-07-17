import type {Meta, StoryObj} from '@storybook/react';

import BillItem from '@components/BillItem/BillItem';

const meta = {
  title: 'Components/BillItem',
  component: BillItem,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    name: {
      description: '',
      control: {type: 'text'},
    },
    price: {
      description: '',
      control: {type: 'number'},
    },
  },
  args: {
    name: '뽕쟁이족발',
    price: 198000,
  },
} satisfies Meta<typeof BillItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
