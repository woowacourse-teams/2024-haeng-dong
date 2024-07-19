import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import Tab from '@components/Tab/Tab';

const meta = {
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  args: {
    tabs: [
      {label: '전체 지출 내역', content: <div>없지롱</div>},
      {label: '참여자 별 정산', content: <div>있지롱</div>},
    ],
  },
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
