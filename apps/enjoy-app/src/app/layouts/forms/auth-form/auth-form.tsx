import React from 'react';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import TextInput from '@global/components/text-input/text-input';
import { Button } from '@global/components/buttons';
import { AuthMode, ButtonType } from '@global/utils/enum';
import { useAuthForm } from './use-auth-form';
import { AuthUserDto } from '@generated/models';

function AuthForm() {
  const { form, mode, onSubmit, onClose } = useAuthForm();
  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid={'auth-form'}
        css={formStyle}
      >
        <TextInput<AuthUserDto>
          id={'email'}
          fieldName={'email'}
          label={'Email'}
          placeholder={''}
          isRequired
        />
        <TextInput<AuthUserDto>
          id={'password'}
          fieldName={'password'}
          label={'Password'}
          type={'password'}
          placeholder={''}
          isRequired
        />
        <div css={buttonsStyle}>
          <Button
            variant={ButtonType.SECONDARY}
            onClick={onClose}
            disabled={false}
          >
            {'Cancel'}
          </Button>
          <Button
            variant={ButtonType.PRIMARY}
            disabled={!isValid}
            type={'submit'}
          >
            {mode}
          </Button>
          <span>
            {mode === AuthMode.Login
              ? 'Not registered yet?'
              : 'Already registered?'}
          </span>
          <Button variant={ButtonType.INVISIBLE}>
            {mode === AuthMode.Login ? 'Register' : 'Login'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default AuthForm;

const formStyle = () => css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const buttonsStyle = () => css`
  position: absolute;
  bottom: 32px;
  display: flex;
  gap: 16px;
`;
