/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Chip from '@HDcomponents/Chip/Chip';
import Text from '../Text/Text';
import Amount from '../Amount/Amount';

const meta = {
  title: 'Components/Chip',
  component: Chip,
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
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
