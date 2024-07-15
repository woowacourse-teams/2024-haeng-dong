import type {Meta, StoryObj} from '@storybook/react';

import Text from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
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
  },
  args: {
    size: 'body',
    children: 'text',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
