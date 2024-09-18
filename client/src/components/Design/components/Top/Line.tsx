/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import Text from '../Text/Text';

interface Props {
  text: string;
  emphasize?: string[];
}

export default function Line({text, emphasize = []}: Props) {
  const getTextElements = ({text, emphasize = []}: Props) => {
    if (emphasize.length === 0) return [text];

    const regexPattern = new RegExp(`(${emphasize.join('|')})`, 'g');
    return text.split(regexPattern).filter(Boolean);
  };

  const elements = getTextElements({text, emphasize});

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {elements.map(text => {
        return (
          <Text size="subTitle" textColor={emphasize.includes(text) ? 'black' : 'gray'} style={{whiteSpace: 'pre'}}>
            {`${text}`}
          </Text>
        );
      })}
    </div>
  );
}
