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
  argTypes: {
    value: {
      description: '',
      control: {type: 'text'},
    },
    inputType: {
      control: {type: 'radio'},
    },
  },
  args: {
    disabled: false,
    placeholder: 'placeholder',
    searchTerms: ['todari', 'cookie'],
    setKeyword: (keyword: string) => console.log(keyword),
  },
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
