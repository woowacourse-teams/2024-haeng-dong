/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {Profile} from './Profile';

const meta: Meta<typeof Profile> = {
  title: 'Components/Profile',
  component: Profile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{width: '200px', height: '200px', padding: '1rem'}}>
        <Story />
      </div>
    ),
  ],
  args: {
    src: 'https://wooteco-crew-wiki.s3.ap-northeast-2.amazonaws.com/%EC%9B%A8%EB%94%94%286%EA%B8%B0%29/g583lirp8yg.jpg',
    size: 'large',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Playground 스토리
export const Playground: Story = {};
