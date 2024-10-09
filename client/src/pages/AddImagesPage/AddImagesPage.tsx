import {css} from '@emotion/react';
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Carousel from '@components/Design/components/Carousel/Carousel';
import useRequestGetImages from '@hooks/queries/images/useRequestGetImages';
import useRequestPostImages from '@hooks/queries/images/useRequestPostImages';

import {Button, FixedButton, MainLayout, Top, TopNav} from '@components/Design';

import getEventIdByUrl from '@utils/getEventIdByUrl';

const AddImagesPage = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();

  const {postImages, isPending, isSuccess} = useRequestPostImages();
  const {images: prevImages} = useRequestGetImages();

  const handleChangeImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const dataTransfer = new DataTransfer();

      if (files) {
        Array.from(files).forEach(file => dataTransfer.items.add(file));
      }

      Array.from(event.target.files).forEach(file => dataTransfer.items.add(file));

      setFiles(dataTransfer.files);
    }
  };

  const handleDeleteImage = (index: number) => {
    const dataTransfer = new DataTransfer();

    if (files) {
      Array.from(files).forEach((file, idx) => {
        if (idx === index) return;
        dataTransfer.items.add(file);
      });
    }

    setFiles(dataTransfer.files);
  };

  const canSubmit = files && files.length !== 0;

  const submitImages = () => {
    const formData = new FormData();

    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i], files[i].name);
    }

    postImages({formData});
  };

  useEffect(() => {
    document.body.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    navigate(`/event/${eventId}/admin`);
  }, [isSuccess]);

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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleChangeImages}
          style={{display: 'none'}}
        />
        <Button variants="primary" onClick={() => fileInputRef.current?.click()}>
          사진 추가하기
        </Button>
      </div>
      <Carousel
        urls={
          files
            ? [...prevImages.map(({url}) => url), ...Array.from(files).map(file => URL.createObjectURL(file))]
            : prevImages.map(({url}) => url)
        }
        onClickDelete={handleDeleteImage}
      />
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
