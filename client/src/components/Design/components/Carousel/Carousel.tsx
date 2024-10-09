/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {CarouselProps} from './Carousel.type';
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {useRef, useState} from 'react';

const Carousel = ({urls}: CarouselProps) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const {theme} = useTheme();
  return (
    <div
      css={css`
        /* overflow: hidden; */
        display: flex;
        overflow-x: auto;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 1rem;
          margin-inline: 1rem;
        `}
      >
        {urls &&
          urls.map((url, index) => (
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;

                clip-path: inset(0 round 1rem);
                background-color: ${theme.colors.grayContainer};
                /* overflow: hidden; */
              `}
            >
              <img
                key={index}
                src={url}
                alt={`업로드된 이미지 ${index + 1}`}
                css={css`
                  width: ${urls.length === 1 ? `calc(100vw - 2rem)` : `calc(100vw - 4rem)`};
                  aspect-ratio: 3/4;
                  object-fit: contain;
                `}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
