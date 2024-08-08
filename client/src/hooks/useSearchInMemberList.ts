import {useEffect, useState} from 'react';

import {requestGetCurrentInMemberList} from '@apis/request/member';

import {useFetch} from '@apis/useFetch';

import useEventId from './useEventId/useEventId';

export type ReturnUseSearchInMemberList = {
  currentInputIndex: number;
  handleCurrentInputIndex: (inputIndex: number) => void;
  filteredInMemberList: string[];
  searchCurrentInMember: (event: React.ChangeEvent<HTMLInputElement>) => void;
  chooseMember: (inputIndex: number, name: string) => void;
};

const useSearchInMemberList = (
  setInputValueTargetIndex: (index: number, value: string) => void,
): ReturnUseSearchInMemberList => {
  const {eventId} = useEventId();

  const {fetch} = useFetch();
  const [currentInputIndex, setCurrentInputIndex] = useState(-1);

  // 서버에서 가져온 전체 리스트
  const [currentInMemberList, setCurrentInMemberList] = useState<Array<{name: string}>>([]);

  // 검색된 리스트 (따로 둔 이유는 검색 후 클릭했을 때 리스트를 비워주어야하기 때문)
  const [filteredInMemberList, setFilteredInMemberList] = useState<Array<string>>([]);

  useEffect(() => {
    if (eventId === '') return;

    const getCurrentInMembers = async () => {
      const currentInMemberListFromServer = await fetch(() => requestGetCurrentInMemberList(eventId));
      setCurrentInMemberList(currentInMemberListFromServer.members);
    };

    getCurrentInMembers();
  }, [eventId]);

  const filterSearchTerms = (keyword: string) => {
    if (keyword.trim() === '') return [];

    const searchTerms = currentInMemberList.map(({name}) => name);
    return searchTerms.filter(terms => terms.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) > -1).slice(0, 3);
  };

  const chooseMember = (inputIndex: number, name: string) => {
    setFilteredInMemberList([]);
    setInputValueTargetIndex(inputIndex, name);
  };

  const searchCurrentInMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setFilteredInMemberList(filterSearchTerms(value));
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
