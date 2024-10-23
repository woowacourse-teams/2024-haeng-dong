/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Carousel from './Carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    width: 430,
  },
  argTypes: {},
  args: {
    urls: [
      'https://wooteco-crew-wiki.s3.ap-northeast-2.amazonaws.com/%EC%BF%A0%ED%82%A4(6%EA%B8%B0)/image.png',
      'https://wooteco-crew-wiki.s3.ap-northeast-2.amazonaws.com/%EC%BF%A0%ED%82%A4%286%EA%B8%B0%29/4tyq1x19rsn.jpg',
      'https://img.danawa.com/images/descFiles/5/896/4895281_1_16376712347542321.gif',
    ],
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
