/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React from 'react';

import Line from './Line';
import EditableLine from './EditableLine';

Top.Line = Line;
Top.EditableLine = EditableLine;

export default function Top({children}: React.PropsWithChildren) {
  const childrenTexts: string[] = [];
  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && child.type === Top.Line) {
      childrenTexts.push(child.props.text);
    }
  });

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
      aria-label={childrenTexts.join(' ')}
    >
      {children}
    </div>
  );
}
