import useRequestGetMemberReportList from '@hooks/queries/useRequestGetMemberReportList';

type UseSearchMemberReportListParams = {
  name: string;
};

const useSearchMemberReportList = ({name}: UseSearchMemberReportListParams) => {
  const {data} = useRequestGetMemberReportList();
  const memberReportList = data ?? [];

  return {
    memberReportSearchList: memberReportList.filter(memberReport => memberReport.name.includes(name)),
    memberReportList,
  };
};

export default useSearchMemberReportList;
