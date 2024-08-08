/** @jsxImportSource @emotion/react */
import Flex from '@components/Flex/Flex';

import {useTheme} from '@theme/HDesignProvider';

import {searchStyle, searchTermsStyle, searchTermStyle} from './Search.style';

export interface SearchProps {
  isShowTargetInput: boolean;
  searchTerms: string[];
  onTermClick: (term: string) => void;
}

const Search = ({isShowTargetInput, searchTerms, onTermClick, children}: React.PropsWithChildren<SearchProps>) => {
  const {theme} = useTheme();

  return (
    <fieldset css={searchStyle}>
      {children}
      {searchTerms.length > 0 && isShowTargetInput && (
        <ul css={searchTermsStyle(theme)}>
          <Flex flexDirection="column" gap="0.5rem">
            {searchTerms.map((searchTerm, index) => (
              <li key={`${searchTerm}-${index}`}>
                <button type="button" css={searchTermStyle(theme)} onClick={() => onTermClick(searchTerm)}>
                  {searchTerm}
                </button>
              </li>
            ))}
          </Flex>
        </ul>
      )}
    </fieldset>
  );
};

export default Search;
