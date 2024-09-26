import type {Meta, StoryObj} from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variants: {
      description: '',
      control: {type: 'select'},
      options: ['', 'primary', 'secondary', 'tertiary', 'destructive', 'loading'],
    },
    size: {
      description: '',
      control: {type: 'select'},
      options: ['', 'small', 'medium', 'large'],
    },
    disabled: {
      description: '',
      control: {type: 'boolean'},
    },
  },
  args: {
    variants: 'primary',
    size: 'medium',
    disabled: false,
    children: 'button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
