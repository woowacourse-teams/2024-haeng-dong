/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Box from '../Box/Box';

import Carousel from './Carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: {
        width: 430,
        height: 930,
      },
    },
    docs: {
      description: {
        component: `
Carousel 컴포넌트는 이미지들을 슬라이드 형태로 보여주는 컴포넌트입니다.

### 주요 기능
- 이미지 슬라이드 기능
- 드래그로 이미지 전환 가능
- 이미지 삭제 기능 (선택적)
- 이미지 인디케이터
- 좌우 이동 버튼

### 사용 예시
\`\`\`jsx
<Carousel 
  urls={[
    'image1.jpg',
    'image2.jpg',
    'image3.jpg'
  ]}
  onClickDelete={(index) => handleDelete(index)} // 선택적
/>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    urls: {
      description: '캐러셀에 표시할 이미지 URL 배열',
    },
    onClickDelete: {
      description: '이미지 삭제 핸들러 (선택적)',
    },
  },
  args: {
    urls: [
      'https://d1f4hb6ir36p4s.cloudfront.net/images/todari.png',
      'https://d1f4hb6ir36p4s.cloudfront.net/images/cookie.png',
      'https://d1f4hb6ir36p4s.cloudfront.net/images/weadie.png',
      'https://d1f4hb6ir36p4s.cloudfront.net/images/soha.png',
    ],
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <Box w={480} h={930} bg="#ffffff" p={16} b="1px solid #eee" br={8}>
        <Carousel {...args} />
      </Box>
    );
  },
};

export const WithDeleteButton: Story = {
  render: args => (
    <Box w={480} h={930} bg="#ffffff" p={16} b="1px solid #eee" br={8}>
      <Carousel {...args} onClickDelete={index => alert(`Delete image at index ${index}`)} />
    </Box>
  ),
};
