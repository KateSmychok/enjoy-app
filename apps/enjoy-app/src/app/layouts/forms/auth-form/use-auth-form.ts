import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from './auth-form-schema';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { RootState } from '@store/store';
import { authSliceActions } from '@store/reducers/auth-slice';
import { AuthMode } from '@global/utils/enum';
import { userSliceActions } from '@store/reducers/user-slice';
import { useApiClient } from '@global/modules/api-client';
import {AuthUserInputDto, UserDto} from '@generated/models';

export const useAuthForm = () => {
  const client = useApiClient();
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver<AuthUserInputDto>(authSchema),
  });

  const { mode } = useAppSelector((state: RootState) => state.authReducer);

  const handleCloseAuthModal = () => {
    dispatch(authSliceActions.closeAuthModal());
  };

  const handleRegister = async (inputValues: AuthUserInputDto) => {
    const { data } = await client.auth.register(inputValues);
    console.log(data);
  };

  const handleLogin = async (inputValues: AuthUserInputDto) => {
    const { data } = await client.auth.login(inputValues);
    const user = data.user;
    console.log(data);
    localStorage.setItem('token', data.accessToken);

    dispatch(authSliceActions.closeAuthModal());
    dispatch(authSliceActions.logIn());
    dispatch(userSliceActions.setUser(user as UserDto));
  };

  return {
    form,
    mode,
    onClose: handleCloseAuthModal,
    onSubmit: mode === AuthMode.Login ? handleLogin : handleRegister,
    onToggleMode: () => dispatch(authSliceActions.toggleMode()),
  };
};
