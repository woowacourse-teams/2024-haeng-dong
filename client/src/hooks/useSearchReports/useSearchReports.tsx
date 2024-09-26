import useRequestGetReports from '@hooks/queries/report/useRequestGetReports';

type UseSearchReportsParams = {
  memberName: string;
};

const useSearchReports = ({memberName}: UseSearchReportsParams) => {
  const {reports} = useRequestGetReports();

  return {
    matchedReports: reports.filter(memberReport => memberReport.memberName.includes(memberName)),
    reports,
  };
};

export default useSearchReports;
