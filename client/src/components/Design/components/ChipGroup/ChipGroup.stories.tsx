/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import ChipGroup from '@HDcomponents/ChipGroup/ChipGroup';

const meta = {
  title: 'Components/ChipGroup',
  component: ChipGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      description: '',
      control: {type: 'select'},
    },
  },
  args: {
    color: 'gray',
    texts: ['망쵸', '감자', '백호', '이상'],
  },
} satisfies Meta<typeof ChipGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
