import {useState} from 'react';

interface UseSearchProps {
  searchTerms: string[];
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const useSearch = ({searchTerms, setState}: UseSearchProps) => {
  const [value, setValue] = useState('');
  const [showSearchTerms, setShowSearchTerms] = useState(false);

  const handleOnClick = (searchTerm: string) => {
    setValue(searchTerm);
    setState(searchTerm);
    setShowSearchTerms(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setValue(value);
    setShowSearchTerms(value.trim() !== '' && filterSearchTerms(value).length !== 0);
  };

  const filterSearchTerms = (keyword: string) => {
    if (keyword.trim() === '') return [];

    return searchTerms.filter(terms => terms.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) > -1);
  };

  return {
    value,
    showSearchTerms,
    handleOnClick,
    handleOnChange,
    filterSearchTerms,
  };
};

export default useSearch;
