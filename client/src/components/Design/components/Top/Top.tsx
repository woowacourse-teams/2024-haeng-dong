/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import Line from './Line';
import EditableLine from './EditableLine';

Top.Line = Line;
Top.EditableLine = EditableLine;

export default function Top({children}: React.PropsWithChildren) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {children}
    </div>
  );
}
