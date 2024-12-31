import {css} from '@emotion/react';
import {useEffect, useRef, useState} from 'react';

import {useTheme} from '@components/Design/theme/HDesignProvider';
import TYPOGRAPHY from '@components/Design/token/typography';

import Icon from '../Icons/Icon';
import Text from '../Text/Text';

interface Props {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  readOnly?: boolean;
  isFixed?: boolean;
  activated?: boolean;
}

const EditableAmount = ({value, onChange, onClick, readOnly = true, isFixed = false, activated}: Props) => {
  const {theme} = useTheme();

  const [width, setWidth] = useState(0);

  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (spanRef.current) {
      setWidth(spanRef.current.getBoundingClientRect().width);
    }
  }, [value]);

  return (
    <label onClick={onClick}>
      <div
        css={css`
          display: flex;
          gap: 0.5rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.25rem;
          `}
        >
          {isFixed && (
            <Text size="caption" textColor="error">
              *
            </Text>
          )}
          <input
            css={css([
              TYPOGRAPHY.body,
              css`
                text-align: end;
                color: ${theme.colors.black};
                width: ${width}px;

                transition: 0.2s ease-in-out;
                border-bottom: 1px solid transparent;
                ${activated ? `border-bottom-color: ${theme.colors.primary};` : ''};

                ::placeholder {
                  color: ${theme.colors.gray};
                }
              `,
            ])}
            readOnly={readOnly}
            placeholder="0"
            value={value}
            onChange={onChange}
          />
          <Text size="tiny" textColor="gray">
            원
          </Text>
        </div>
        <Icon iconType="editPencil" />
      </div>

      <span
        ref={spanRef}
        css={[
          TYPOGRAPHY.body,
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
        {value === '' ? '0' : value}
      </span>
    </label>
  );
};

export default EditableAmount;
