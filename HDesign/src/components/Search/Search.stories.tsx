import type {Meta, StoryObj} from '@storybook/react';

import React from 'react';

import Search from '@components/Search/Search';

const meta = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{minHeight: '10rem'}}>
        <Story />
      </div>
    ),
  ],
  args: {
    isShowTargetInput: true,
    matchItems: ['todari', 'cookie'],
    onMatchItemClick: keyword => alert(keyword),
  },
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
