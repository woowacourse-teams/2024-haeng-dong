import type {Meta, StoryObj} from '@storybook/react';

import TextButton from '@components/TextButton/TextButton';

const meta = {
  title: 'Components/TextButton',
  component: TextButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    textSize: {
      description: '',
      control: {type: 'select'},
      options: [
        'head',
        'title',
        'subTitle',
        'bodyBold',
        'body',
        'smallBodyBold',
        'smallBody',
        'caption',
        'captionBold',
        'tiny',
      ],
    },
    textColor: {
      description: '',
      control: {type: 'select'},
      options: ['black', 'gray'],
    },
    children: {
      description: '',
      control: {type: 'text'},
    },
  },
  args: {
    textColor: 'black',
    textSize: 'bodyBold',
    children: '뒤로가기',
  },
} satisfies Meta<typeof TextButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
