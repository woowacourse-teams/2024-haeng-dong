import {useLocation} from 'react-router-dom';

import useRequestPatchUser from '@hooks/queries/event/useRequestPatchUser';

import useEventDataContext from '@hooks/useEventDataContext';

import EditAccountPageView from '@components/EditAccountPageView';

import getEventBaseUrl from '@utils/getEventBaseUrl';

const EditAccountPage = () => {
  const {bankName, accountNumber} = useEventDataContext();
  const {patchUser} = useRequestPatchUser();

  const location = useLocation();
  const redirectUrlOnSubmit = `/${getEventBaseUrl(location.pathname)}/admin`;

  return (
    <EditAccountPageView
      bankName={bankName}
      accountNumber={accountNumber}
      onSubmit={patchUser}
      redirectUrlOnSubmit={redirectUrlOnSubmit}
    />
  );
};

export default EditAccountPage;
