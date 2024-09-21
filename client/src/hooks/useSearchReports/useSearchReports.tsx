import useRequestGetReports from '@hooks/queries/report/useRequestGetReports';

type UseSearchReportsParams = {
  name: string;
};

const useSearchReports = ({name}: UseSearchReportsParams) => {
  const {reports} = useRequestGetReports();

  return {
    matchedReports: reports.filter(memberReport => memberReport.name.includes(name)),
    reports,
  };
};

export default useSearchReports;
