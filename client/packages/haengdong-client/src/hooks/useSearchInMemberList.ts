import {useState} from 'react';

import useRequestGetCurrentInMemberList from './queries/useRequestGetCurrentInMemberList';

export type ReturnUseSearchInMemberList = {
  currentInputIndex: number;
  handleCurrentInputIndex: (inputIndex: number) => void;
  filteredInMemberList: string[];
  searchCurrentInMember: (event: React.ChangeEvent<HTMLInputElement>) => void;
  chooseMember: (inputIndex: number, name: string) => void;
};

const useSearchInMemberList = (handleChange: (index: number, value: string) => void): ReturnUseSearchInMemberList => {
  const [currentInputIndex, setCurrentInputIndex] = useState(-1);

  // 서버에서 가져온 전체 리스트
  const {data} = useRequestGetCurrentInMemberList();
  const currentInMemberList = data?.memberNames ?? [];

  // 검색된 리스트 (따로 둔 이유는 검색 후 클릭했을 때 리스트를 비워주어야하기 때문)
  const [filteredInMemberList, setFilteredInMemberList] = useState<Array<string>>([]);

  const filterMatchItems = (keyword: string) => {
    if (keyword.trim() === '') return [];

    return currentInMemberList
      .filter(member => member.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) > -1)
      .slice(0, 3);
  };

  const chooseMember = (inputIndex: number, name: string) => {
    setFilteredInMemberList([]);
    handleChange(inputIndex, name);
  };

  const searchCurrentInMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setFilteredInMemberList(filterMatchItems(value));
  };

  const handleCurrentInputIndex = (inputIndex: number) => {
    setCurrentInputIndex(inputIndex);
  };

  return {
    currentInputIndex,
    handleCurrentInputIndex,
    filteredInMemberList,
    searchCurrentInMember,
    chooseMember,
  };
};

export default useSearchInMemberList;