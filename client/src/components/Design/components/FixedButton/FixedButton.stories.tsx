/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import FixedButton from '@HDcomponents/FixedButton/FixedButton';

const meta = {
  title: 'Components/FixedButton',
  component: FixedButton,
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    variants: {
      description: '',
      control: {type: 'select'},
      options: ['', 'primary', 'secondary', 'tertiary', 'loading'],
    },
    disabled: {
      description: '',
      control: {type: 'boolean'},
    },
    onDeleteClick: {
      description: '',
      control: {type: 'select'},
      options: [undefined, () => alert('delete')],
    },
  },
  args: {
    variants: 'primary',
    disabled: false,
    children: 'button',
    onDeleteClick: () => alert('delete'),
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
