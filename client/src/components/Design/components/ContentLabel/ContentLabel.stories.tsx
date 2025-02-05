/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import ContentLabel from './ContentLabel';

const meta = {
  title: 'Components/ContentLabel',
  component: ContentLabel,
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
    children: '기본 계좌번호',
    onClick: () => {},
  },
} satisfies Meta<typeof ContentLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
