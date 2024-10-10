import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {ImageFile} from 'types/serviceType';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import useRequestGetImages from './queries/images/useRequestGetImages';
import useRequestPostImages from './queries/images/useRequestPostImages';
import useRequestDeleteImage from './queries/images/useRequestDeleteImages';

type LoadedImage = ImageFile;
type AddedImage = File;

const useAddImagesPage = () => {
  const [images, setImages] = useState<Array<LoadedImage | AddedImage>>([]);
  const [isPrevImageDeleted, setIsPrevImageDeleted] = useState(false);
  const addedImages = images.filter(image => image instanceof File);
  const {images: prevImages, isSuccess} = useRequestGetImages();
  const urls = images.map(image => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else {
      return image.url;
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();

  const {postImages, isPending} = useRequestPostImages();
  const {deleteImage} = useRequestDeleteImage();

  useEffect(() => {
    if (!isSuccess) return;
    setImages([...prevImages]);
  }, [prevImages, isSuccess]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const handleChangeImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    //TODO: (@Todari): 현재 A 이미지 추가 -> A 이미지 x 버튼 눌러 취소 -> 다시 A 이미지 추가 시 업로드 되지 않음
    //                 event.target.files가 변경되지 않기 때문에 onChange에 넣은
    //                 handleChangeImages가 실행되지 않아 일어나는 문제로 추정
    if (event.target.files) {
      const dataTransfer = new DataTransfer();

      if (addedImages) {
        Array.from(addedImages).forEach(image => dataTransfer.items.add(image));
      }

      Array.from(event.target.files).forEach(image => dataTransfer.items.add(image));

      setImages([...prevImages, ...dataTransfer.files]);
    }
  };

  const handleDeleteImage = (index: number) => {
    if ('url' in images[index]) {
      //TODO: (@Todari): 추후 낙관적 업데이트 적용
      deleteImage({
        imageId: images[index].id,
      });
      setIsPrevImageDeleted(true);
    } else {
      setImages(prev => prev.filter((_, idx) => idx !== index));
    }
  };

  const canSubmit = addedImages.length !== 0 || isPrevImageDeleted;

  const submitImages = async () => {
    if (addedImages.length !== 0) {
      const formData = new FormData();

      for (let i = 0; i < addedImages.length; i++) {
        formData.append('images', addedImages[i], addedImages[i].name);
      }

      await postImages({formData});
    }

    navigate(`/event/${eventId}/admin`);
  };

  useEffect(() => {
    document.body.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  return {fileInputRef, handleChangeImages, urls, handleDeleteImage, isPending, canSubmit, submitImages};
};

export default useAddImagesPage;
