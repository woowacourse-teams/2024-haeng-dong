/** @jsxImportSource @emotion/react */
import React from 'react';
import {useNavigate} from 'react-router-dom';

import TextButton from '@components/TextButton/TextButton';

function Back() {
  const navigate = useNavigate();

  return (
    <TextButton onClick={() => navigate(-1)} textSize="bodyBold" textColor="gray">
      뒤로가기
    </TextButton>
  );
}

export default Back;
