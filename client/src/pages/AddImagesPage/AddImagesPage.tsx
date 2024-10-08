import {FixedButton, MainLayout, Top, TopNav} from '@components/Design';
import Carousel from '@components/Design/components/Carousel/Carousel';
import {css} from '@emotion/react';
import useRequestPostImages from '@hooks/queries/images/useRequestPostImages';
import {useEffect, useState} from 'react';

const AddImagesPage = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const {postImages, isPending} = useRequestPostImages();

  const handleChangeImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const dataTransfer = new DataTransfer();

      // 기존 파일을 DataTransfer에 추가
      if (files) {
        Array.from(files).forEach(file => dataTransfer.items.add(file));
      }

      // 새로운 파일을 DataTransfer에 추가
      Array.from(event.target.files).forEach(file => dataTransfer.items.add(file));

      // 새로운 FileList로 업데이트
      setFiles(dataTransfer.files);
    }
  };

  const canSubmit = files && files.length !== 0;

  const submitImages = () => {
    const formData = new FormData();

    if (!files) return;
    console.log(files, files.length);
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i], files[i].name);
    }

    console.log(formData.get('images'));

    postImages({formData});
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
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
        <input type="file" accept="image/*" multiple onChange={handleChangeImages} />
      </div>
      <Carousel urls={files ? Array.from(files).map(file => URL.createObjectURL(file)) : []} />
      {/* <Carousel
        urls={[
          'https://wooteco-crew-wiki.s3.ap-northeast-2.amazonaws.com/%EC%BF%A0%ED%82%A4(6%EA%B8%B0)/image.png',
          'https://wooteco-crew-wiki.s3.ap-northeast-2.amazonaws.com/%EC%BF%A0%ED%82%A4%286%EA%B8%B0%29/4tyq1x19rsn.jpg',
          'https://img.danawa.com/images/descFiles/5/896/4895281_1_16376712347542321.gif',
        ]}
      /> */}
      <div
        css={css`
          height: 9.25rem;
          content: ' ';
        `}
      />
      <FixedButton variants={isPending ? 'loading' : 'primary'} disabled={!canSubmit} onClick={submitImages}>
        추가완료
      </FixedButton>
    </MainLayout>
  );
};

export default AddImagesPage;
