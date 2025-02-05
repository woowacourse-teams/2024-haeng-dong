import {css} from '@emotion/react';

import Carousel from '@components/Design/components/Carousel/Carousel';

import useAddImagesPage from '@hooks/useAddImagesPage';

import {Button, FixedButton, MainLayout, Top, TopNav} from '@components/Design';

const AddImagesPage = () => {
  const {fileInputRef, handleChangeImages, urls, handleDeleteImage, isPending, canSubmit, submitImages} =
    useAddImagesPage();

  return (
    <MainLayout backgroundColor="white">
      <TopNav
        left={
          <TopNav.Text routePath="-1" isEmphasis={false}>
            뒤로가기
          </TopNav.Text>
        }
      />
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
          <Top.Line text="사진들을 첨부해 주세요" emphasize={['사진들']} />
        </Top>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleChangeImages}
          style={{display: 'none'}}
        />
        <Button variants="tertiary" onClick={() => fileInputRef.current?.click()}>
          사진 추가하기
        </Button>
      </div>
      <Carousel urls={urls} onClickDelete={handleDeleteImage} />
      <div
        css={css`
          height: 9.25rem;
          content: ' ';
        `}
      />
      <FixedButton variants={isPending ? 'loading' : 'primary'} disabled={!canSubmit} onClick={submitImages}>
        변경 완료
      </FixedButton>
    </MainLayout>
  );
};

export default AddImagesPage;
