import type {Meta, StoryObj} from '@storybook/react';

import DragHandleItem from '@components/DragHandleItem/DragHandleItem';

const meta = {
  title: 'Components/DragHandleItem',
  component: DragHandleItem,
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    backgroundColor: {
      description: '',
      control: {type: 'select'},
      options: ['white', 'gray', 'darkGray', 'black', 'primary', 'onPrimary', 'secondary', 'onSecondary'],
    },
    hasDragHandle: {
      description: '드래그할 수 있는 핸들러(불주사 자국)를 켜고 끌 수 있습니다.',
      control: {type: 'boolean'},
    },
  },
  args: {
    backgroundColor: 'white',
    children: '이건 끌 수 있는 아이템을 위한 것',
  },
} satisfies Meta<typeof DragHandleItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
