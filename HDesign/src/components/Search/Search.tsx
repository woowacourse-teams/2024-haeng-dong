/** @jsxImportSource @emotion/react */
import Input from '../Input/Input';
import {InputProps} from '../Input/Input.type';
import {searchStyle, searchTermsStyle} from './Search.style';
import useSearch from './useSearch';
import {searchTermStyle} from './Search.style';
import {useTheme} from '@theme/HDesignProvider';
import Flex from '@components/Flex/Flex';

export interface SearchProps extends InputProps {
  searchTerms: string[];
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({searchTerms, setState, ...inputProps}: SearchProps) => {
  const {theme} = useTheme();
  const {value, showSearchTerms, handleOnChange, handleOnClick, filterSearchTerms} = useSearch({
    searchTerms,
    setState,
  });

  return (
    <fieldset css={searchStyle}>
      <Input inputType="search" value={value} onChange={handleOnChange} {...inputProps} />
      {showSearchTerms && (
        <ul css={searchTermsStyle(theme)}>
          <Flex flexDirection="column" gap="0.5rem">
            {filterSearchTerms(value).map((searchTerm, index) => (
              <li key={`${searchTerm}-${index}`}>
                <button type="button" css={searchTermStyle(theme)} onClick={() => handleOnClick(searchTerm)}>
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
