/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Text from '../Text/Text';

import ContentItem from './ContentItem';

const meta = {
  title: 'Components/ContentItem',
  component: ContentItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{width: '400px', height: '200px', padding: '1rem'}}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
  args: {
    labels: <ContentItem.Label>기본 계좌번호</ContentItem.Label>,
    children: (
      <Text textColor="black" size="bodyBold">
        000-00000-0000
      </Text>
    ),
    onEditClick: () => {},
  },
} satisfies Meta<typeof ContentItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
