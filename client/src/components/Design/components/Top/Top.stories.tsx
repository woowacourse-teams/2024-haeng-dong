/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Top from '@HDcomponents/Top/Top';

const meta = {
  title: 'Components/Top',
  component: Top,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Top>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    return (
      <Top>
        <Top.Line text="정산을 시작하려는" />
        <Top.Line text="행사의 이름은 무엇인가요?" emphasize={['행사의 이름']} />
      </Top>
    );
  },
};
