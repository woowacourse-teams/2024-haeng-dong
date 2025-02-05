/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Tabs from '@HDcomponents/Tabs/Tabs';

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
      <Tab label="전체 지출 내역" content={<div>없지롱</div>} />,
      <Tab label="참여자 별 정산" content={<div>있지롱</div>} />,
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
