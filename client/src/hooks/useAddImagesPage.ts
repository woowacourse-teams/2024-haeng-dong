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
  const {images: prevImages} = useRequestGetImages();
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
    if (!prevImages) return;
    setImages([...prevImages]);
  }, [prevImages]);

  const handleChangeImages = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const formData = new FormData();

    if (!addedImages) return;

    for (let i = 0; i < addedImages.length; i++) {
      formData.append('images', addedImages[i], addedImages[i].name);
    }

    await postImages({formData});
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
