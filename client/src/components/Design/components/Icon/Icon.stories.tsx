import type {Meta, StoryObj} from '@storybook/react';

import Icon from '@HDcomponents/Icon/Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    iconType: {
      description: '',
      control: {type: 'select'},
      options: [
        'inputDelete',
        'buljusa',
        'rightChevron',
        'search',
        'confirm',
        'error',
        'trash',
        'trashMini',
        'check',
        'x',
        'pencilMini',
      ],
    },
  },
  args: {
    iconType: 'rightChevron',
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
