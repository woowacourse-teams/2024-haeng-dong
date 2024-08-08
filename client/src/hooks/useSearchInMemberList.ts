import {useEffect, useState} from 'react';

import {requestGetCurrentInMemberList} from '@apis/request/member';

import {useFetch} from '@apis/useFetch';

import useEventId from './useEventId/useEventId';

const useSearchInMemberList = (setInputValueTargetIndex: (index: number, value: string) => void) => {
  const {eventId} = useEventId();

  const {fetch} = useFetch();
  const [currentInputIndex, setCurrentInputIndex] = useState(-1);
  const [currentInMemberList, setCurrentInMemberList] = useState<Array<{name: string}>>([]);
  const [filteredInMemberList, setFilteredInMemberList] = useState<Array<string>>([]);
  const [selectedMember, setSelectedMember] = useState('');

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
    return searchTerms.filter(terms => terms.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) > -1);
  };

  const chooseMember = (inputIndex: number, name: string) => {
    setSelectedMember(name);
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
