/** @jsxImportSource @emotion/react */
import {useNavigate} from 'react-router-dom';

import TextButton from '@HDcomponents/TextButton/TextButton';

type BackProps = {
  onClick?: () => void;
};

function Back({onClick}: BackProps) {
  const navigate = useNavigate();

  return (
    <TextButton onClick={() => (onClick ? onClick() : navigate(-1))} textSize="bodyBold" textColor="gray">
      뒤로가기
    </TextButton>
  );
}

export default Back;
