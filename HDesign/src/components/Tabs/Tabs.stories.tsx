import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import Tabs from '@/components/Tabs/Tabs';
import Tab from './Tab';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  args: {
    children: [
      <Tab key={0} label="전체 지출 내역" content={<div>없지롱</div>} />,
      <Tab key={1} label="참여자 별 정산" content={<div>있지롱</div>} />,
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
