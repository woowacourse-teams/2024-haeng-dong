import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Global} from '@emotion/react';

import {Theme} from '@theme/theme.type';
import {GlobalStyle} from '@theme/GlobalStyle';
import {COLORS} from '@token/colors';
import {TYPOGRAPHY} from '@token/typography';

interface ThemeContextProps {
  theme: Theme;
}

const defaultTheme: Theme = {
  colors: COLORS,
  typography: TYPOGRAPHY,
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const HDesignProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [theme, _] = useState<Theme>(defaultTheme);
  return (
    <ThemeContext.Provider value={{theme}}>
      <Global styles={GlobalStyle} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a HDesignProvider');
  }
  return context;
};
