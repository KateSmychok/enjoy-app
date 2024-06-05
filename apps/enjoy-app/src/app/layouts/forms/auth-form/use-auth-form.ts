import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from './auth-form-schema';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { RootState } from '@store/store';
import { authSliceActions } from '@store/reducers/auth-slice';
import { AuthMode } from '@global/utils/enum';
import { omit } from 'lodash';
import { IUser, userSliceActions } from '@store/reducers/user-slice';
import { useApiClient } from '@global/modules/api-client';
import { AuthUserDto } from '@generated/models';

export const useAuthForm = () => {
  const client = useApiClient();
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver<AuthUserDto>(authSchema),
  });

  const { mode } = useAppSelector((state: RootState) => state.authReducer);

  const handleCloseAuthModal = () => {
    dispatch(authSliceActions.closeAuthModal());
  };

  const handleRegister = async (inputValues: AuthUserDto) => {
    const res = await client.auth.register(inputValues);
    console.log(res.data);
  };

  const handleLogin = async (inputValues: AuthUserDto) => {
    const res = await client.auth.login(inputValues);
    const user = omit(res.data.user, ['password', 'roles', 'activationLink']);
    console.log(res.data);
    localStorage.setItem('token', res.data.accessToken);

    dispatch(authSliceActions.closeAuthModal());
    dispatch(authSliceActions.logIn());
    dispatch(userSliceActions.setUser(user as IUser));
  };

  return {
    form,
    mode,
    onClose: handleCloseAuthModal,
    onSubmit: mode === AuthMode.Login ? handleLogin : handleRegister,
  };
};
