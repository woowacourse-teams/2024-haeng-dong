/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useEffect, useRef, useState} from 'react';

import TYPOGRAPHY from '@components/Design/token/typography';
import {useTheme} from '@components/Design/theme/HDesignProvider';

import {IconEdit} from '../Icons/Icons/IconEdit';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditableLine({value, onChange}: Props) {
  const {theme} = useTheme();
  const [width, setWidth] = useState(0);

  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (spanRef.current) {
      setWidth(spanRef.current.getBoundingClientRect().width);
    }
  }, [value]);

  return (
    <label>
      <div
        css={css`
          display: flex;
          gap: 0.5rem;
        `}
      >
        <input
          css={css([
            TYPOGRAPHY.subTitle,
            css`
              color: ${theme.colors.black};
              width: ${width}px;

              ::placeholder {
                color: ${theme.colors.gray};
              }
            `,
          ])}
          placeholder="ex) 뽕쟁이 족발"
          value={value}
          onChange={onChange}
        />
        <IconEdit />
      </div>

      <span
        ref={spanRef}
        css={[
          TYPOGRAPHY.subTitle,
          ,
          css`
            position: absolute;
            width: fit-content;
            height: 1px;
            margin: -1px;
            border: 0;
            padding: 0;

            white-space: nowrap;
            clip-path: inset(100%);
            clip: rect(0 0 0 0);
            overflow: hidden;
          `,
        ]}
      >
        {value === '' ? 'ex) 뽕쟁이 족발' : value}
      </span>
    </label>
  );
}
