/** @jsxImportSource @emotion/react */
import Flex from '@HDcomponents/Flex/Flex';

import {useTheme} from '@theme/HDesignProvider';

import {searchStyle, searchTermsStyle, searchTermStyle} from './Search.style';

export interface SearchProps {
  isShowTargetInput: boolean;
  matchItems: string[];
  onMatchItemClick: (term: string) => void;
}

const Search = ({isShowTargetInput, matchItems, onMatchItemClick, children}: React.PropsWithChildren<SearchProps>) => {
  const {theme} = useTheme();

  return (
    <fieldset css={searchStyle}>
      {children}
      {matchItems.length > 0 && isShowTargetInput && (
        <ul css={searchTermsStyle(theme)}>
          <Flex flexDirection="column" gap="0.5rem">
            {matchItems.map((matchItem, index) => (
              <li key={`${matchItem}-${index}`}>
                <button type="button" css={searchTermStyle(theme)} onClick={() => onMatchItemClick(matchItem)}>
                  {matchItem}
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
