/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import ChipButton from '@HDcomponents/ChipButton/ChipButton';

const meta = {
  title: 'Components/ChipButton',
  component: ChipButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      description: '',
      control: {type: 'select'},
    },
    text: {
      description: '',
      control: {type: 'text'},
    },
  },
  args: {
    color: 'gray',
    text: '망쵸',
    onClick: () => {},
  },
} satisfies Meta<typeof ChipButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
