/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import DragHandleItemContainer from '@components/DragHandleItemContainer/DragHandleItemContainer';
import DragHandleItem from '@components/DragHandleItem/DragHandleItem';

const meta = {
  title: 'Components/DragHandleItemContainer',
  component: DragHandleItemContainer,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    topLeftText: {
      description: '',
      control: {type: 'text'},
    },
    topRightText: {
      description: '',
      control: {type: 'text'},
    },
    bottomLeftText: {
      description: '',
      control: {type: 'text'},
    },
    bottomRightText: {
      description: '',
      control: {type: 'text'},
    },
    backgroundColor: {
      description: '',
      control: {
        type: 'select',
        options: [
          'white',
          'black',
          'primary',
          'onPrimary',
          'secondary',
          'onSecondary',
          'tertiary',
          'onTertiary',
          'gray',
          'darkGray',
          'grayContainer',
          'lightGrayContainer',
          'error',
          'errorContainer',
          'onErrorContainer',
          'warn',
          'complete',
        ],
      },
    },
  },
  args: {
    topLeftText: '으아니차',
    topRightText: '8명',
    bottomLeftText: '총액',
    bottomRightText: '214,000 원',
    onTopLeftTextClick: () => alert('왼쪽 위'),
    onTopRightTextClick: () => alert('오른쪽 위'),
    onBottomLeftTextClick: () => alert('왼쪽 아래'),
    onBottomRightTextClick: () => alert('오른쪽 아래'),
    backgroundColor: 'white',
    children: (
      <>
        <DragHandleItem
          hasDragHandler={true}
          prefix="뽕쟁이족발"
          suffix="198,000원"
          backgroundColor="lightGrayContainer"
        />
        <DragHandleItem
          hasDragHandler={true}
          prefix="인생네컷"
          suffix="16,000원"
          backgroundColor="lightGrayContainer"
        />
      </>
    ),
  },
} satisfies Meta<typeof DragHandleItemContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
