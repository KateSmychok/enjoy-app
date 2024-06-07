import React from 'react';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import TextInput from '@global/components/text-input/text-input';
import { Button } from '@global/components/buttons';
import { AuthMode, ButtonType } from '@global/utils/enum';
import { useAuthForm } from './use-auth-form';
import { AuthUserInputDto } from '@generated/models';
import LinkButton from '@global/components/buttons/link-button';
import StaticText from '@global/components/static-text/static-text';

function AuthForm() {
  const { form, mode, onSubmit, onClose, onToggleMode } = useAuthForm();
  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = form;

  if (mode === AuthMode.Register && isSubmitSuccessful) {
    return (
      <>
        <StaticText text={'Please, check your email to confirm address'} />
        <div css={buttonsStyle}>
          <Button
            variant={ButtonType.SECONDARY}
            onClick={onClose}
            disabled={false}
          >
            {'Cancel'}
          </Button>
        </div>
      </>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid={'auth-form'}
        css={formStyle}
      >
        <TextInput<AuthUserInputDto>
          id={'email'}
          fieldName={'email'}
          label={'Email'}
          placeholder={''}
          isRequired
        />
        <TextInput<AuthUserInputDto>
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
          <Button variant={ButtonType.PRIMARY} type={'submit'} disabled={false}>
            {mode}
          </Button>
          <div>
            <StaticText
              text={
                mode === AuthMode.Login
                  ? 'Not registered yet?'
                  : 'Already registered?'
              }
            />
            <LinkButton
              text={mode === AuthMode.Login ? 'Register' : 'Login'}
              onClick={onToggleMode}
            />
          </div>
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
  align-items: center;
  gap: 16px;
`;
