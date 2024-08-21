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
    hasDragHandler: {
      description: '드래그할 수 있는 핸들러(불주사 자국)를 켜고 끌 수 있습니다.',
      control: {type: 'boolean'},
    },
    prefix: {
      description: '',
      control: {type: 'text'},
    },
    suffix: {
      description: '',
      control: {type: 'text'},
    },
    isFixed: {
      description: '컴포넌트가 고정되어 있는지 여부를 나타냅니다.',
      control: {type: 'boolean'},
    },
  },
  args: {
    backgroundColor: 'white',
    hasDragHandler: true,
    prefix: '뽕쟁이족발',
    suffix: '398,000 원',
  },
} satisfies Meta<typeof DragHandleItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FixedItem: Story = {
  args: {
    isFixed: true,
  },
};
