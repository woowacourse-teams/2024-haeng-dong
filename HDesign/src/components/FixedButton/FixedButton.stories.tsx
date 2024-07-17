/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import FixedButton from '@components/FixedButton/FixedButton';

const meta = {
  title: 'Components/FixedButton',
  component: FixedButton,
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    variants: {
      description: '',
      control: {type: 'select'},
      options: ['', 'primary', 'secondary', 'tertiary'],
    },
    disabled: {
      description: '',
      control: {type: 'boolean'},
    },
  },
  args: {
    variants: 'primary',
    disabled: false,
    children: 'button',
  },
  decorators: [
    Story => (
      <div style={{height: '420px'}}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FixedButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
