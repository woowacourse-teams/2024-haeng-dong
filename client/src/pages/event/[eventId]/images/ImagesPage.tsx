import {css} from '@emotion/react';
import {useEffect} from 'react';

import Carousel from '@components/Design/components/Carousel/Carousel';
import useRequestGetImages from '@hooks/queries/images/useRequestGetImages';

import {MainLayout, Top, TopNav} from '@components/Design';

const ImagesPage = () => {
  const {images} = useRequestGetImages();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <MainLayout backgroundColor="white">
      <TopNav
        left={
          <TopNav.Text routePath="-1" isEmphasis={false}>
            뒤로가기
          </TopNav.Text>
        }
      ></TopNav>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        `}
      >
        <Top>
          <Top.Line text="행사와 관련된" />
          <Top.Line text="사진들을 확인하세요" emphasize={['사진들']} />
        </Top>
      </div>
      <Carousel urls={images.map(({url}) => url)} />
      <div
        css={css`
          height: 9.25rem;
          content: ' ';
        `}
      />
    </MainLayout>
  );
};

export default ImagesPage;
