import useRequestPatchUser from '@hooks/queries/event/useRequestPatchUser';

import useUserInfoContext from '@hooks/useUserInfoContext';

import EditAccountPageView from '@components/EditAccountPageView';

import {ROUTER_URLS} from '@constants/routerUrls';

const EditUserAccountPage = () => {
  const {bankName, accountNumber} = useUserInfoContext();
  const {patchUser} = useRequestPatchUser();

  return (
    <EditAccountPageView
      bankName={bankName}
      accountNumber={accountNumber}
      onSubmit={patchUser}
      redirectUrlOnSubmit={ROUTER_URLS.myPage}
    />
  );
};

export default EditUserAccountPage;
