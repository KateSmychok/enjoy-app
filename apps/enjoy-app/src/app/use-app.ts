import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useApiClient } from '@global/modules/api-client';
import { useAppDispatch } from '@store/hooks';
import { authSliceActions } from '@store/reducers/auth-slice';
import { userSliceActions } from '@store/reducers/user-slice';
import { UserDto } from '@generated/models';

export const useApp = () => {
  const client = useApiClient();
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const { data } = await client.auth.refreshToken();
    localStorage.setItem('token', data.accessToken);
    dispatch(authSliceActions.logIn());
    dispatch(userSliceActions.setUser(data.user as UserDto));
  };

  const debouncedInit = debounce(() => {
    return init();
  }, 200);

  const init = async () => {
    if (localStorage.getItem('token')) checkAuth();
  };

  useEffect(() => {
    debouncedInit();
  }, []);
};
