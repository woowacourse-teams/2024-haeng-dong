import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {ImageFile} from 'types/serviceType';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import useRequestGetImages from './queries/images/useRequestGetImages';
import useRequestPostImages from './queries/images/useRequestPostImages';
import useRequestDeleteImage from './queries/images/useRequestDeleteImages';
import useAmplitude from './useAmplitude';

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
  const {trackUploadImageCount} = useAmplitude();

  useEffect(() => {
    if (!isSuccess) return;
    setImages([...prevImages, ...addedImages]);
  }, [isSuccess, prevImages]);

  const handleChangeImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(prev => [...prev, ...(event.target.files ? Array.from(event.target.files) : [])]);
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
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const canSubmit = addedImages.length !== 0 || isPrevImageDeleted;

  const submitImages = async () => {
    if (addedImages.length !== 0) {
      const formData = new FormData();

      for (let i = 0; i < addedImages.length; i++) {
        formData.append('images', addedImages[i], addedImages[i].name);
      }

      await postImages({formData}, {onSuccess: () => trackUploadImageCount(addedImages.length)});
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
