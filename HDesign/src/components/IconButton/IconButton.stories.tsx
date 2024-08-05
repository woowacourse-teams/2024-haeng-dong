/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import IconButton from '@components/IconButton/IconButton';
import {Search, Buljusa, InputDelete, RightChevron, Error, Trash} from '@assets';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      description: '',
      control: {type: 'select'},
      options: ['large', 'medium', 'small'],
    },
    variants: {
      description: '',
      control: {type: 'select'},
      options: ['none', 'primary', 'secondary', 'tertiary', 'destructive'],
    },
    children: {
      description: '',
      control: {type: 'select'},
      options: [<InputDelete />, <Buljusa />, <RightChevron />, <Search />, <Error />, <Trash />],
    },
  },
  args: {
    size: 'medium',
    variants: 'destructive',
    children: <Trash />,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
