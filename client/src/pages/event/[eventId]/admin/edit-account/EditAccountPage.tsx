import {useLocation} from 'react-router-dom';

import useRequestPatchEvent from '@hooks/queries/event/useRequestPatchEvent';

import useEventDataContext from '@hooks/useEventDataContext';

import EditAccountPageView from '@components/EditAccountPageView';

import getEventBaseUrl from '@utils/getEventBaseUrl';

const EditAccountPage = () => {
  const {bankName, accountNumber} = useEventDataContext();
  const {patchEvent} = useRequestPatchEvent();

  const location = useLocation();
  const redirectUrlOnSubmit = `/${getEventBaseUrl(location.pathname)}/admin`;

  return (
    <EditAccountPageView
      bankName={bankName}
      accountNumber={accountNumber}
      onSubmit={patchEvent}
      redirectUrlOnSubmit={redirectUrlOnSubmit}
    />
  );
};

export default EditAccountPage;
