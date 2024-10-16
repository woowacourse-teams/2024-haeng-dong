/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useEffect, useState} from 'react';
import React from 'react';

import Line from './Line';
import EditableLine from './EditableLine';

Top.Line = Line;
Top.EditableLine = EditableLine;

export default function Top({children}: React.PropsWithChildren) {
  const [childrenTexts, setChildrenTexts] = useState<string[]>([]);

  useEffect(() => {
    const collectedTexts: string[] = [];
    React.Children.forEach(children, child => {
      if (React.isValidElement(child) && child.type === Top.Line) {
        collectedTexts.push(child.props.text);
      }
    });
    setChildrenTexts(collectedTexts);
  }, [children]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
      aria-label={childrenTexts.join(' ')}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
