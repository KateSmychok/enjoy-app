import React, { HTMLInputTypeAttribute } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';
import { css, SerializedStyles, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import {
  errorTextStyle,
  labelStyle,
  rowContainerStyle,
} from '@global/common-styles';

interface InputProps<T> {
  type?: HTMLInputTypeAttribute;
  id?: string;
  fieldName: Path<T>;
  label: string;
  isRequired: boolean;
  disabled?: boolean;
  placeholder: string;
  maxLength?: number;
  width?: number;
  containerStyle?: () => SerializedStyles;
  showErrors?: boolean;
  onChangeHandler?: (value: any) => void;
  defaultValue?: any;
}

function Container(props) {
  const { children, className } = props;
  return <div className={className}>{children}</div>;
}

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 40px;
  border: 1px solid
    ${(props) =>
      props.invalid ? props.theme.colours.error : props.theme.colours.border};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colours.background};
  width: ${(props) => props.width} + 'px';
  opacity: ${(props) => (props.disabled ? '0.4' : '1')};

  &:focus-within {
    border: 1px solid ${(props) => props.theme.colours.primary};

    button {
      outline: none;
      :focus {
        color: ${(props) => props.theme.colours.primary};
      }
    }
  }
`;

function TextInput<T>(props: InputProps<T>) {
  const {
    id,
    fieldName,
    label,
    isRequired,
    placeholder,
    maxLength,
    type = 'text',
    containerStyle,
    showErrors = true,
    disabled = false,
    onChangeHandler,
    defaultValue,
    width = 200,
  } = props;
  const { control } = useFormContext<T>();

  return (
    <Controller
      defaultValue={defaultValue}
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <div css={containerStyle}>
          <label
            htmlFor={field.name}
            css={labelStyle}
            onClick={(e) => e.preventDefault()}
          >
            <div css={rowContainerStyle}>
              {isRequired && label && <div css={errorTextStyle}>*</div>}
              {label}
            </div>
          </label>
          <StyledContainer {...props} invalid={fieldState.invalid}>
            <input
              id={id}
              data-testid={id}
              value={field.value as any}
              onChange={onChangeHandler ?? field.onChange}
              onBlur={field.onBlur}
              placeholder={placeholder}
              type={type}
              maxLength={maxLength}
              onWheel={(e) => e.currentTarget.blur()}
              disabled={disabled}
              css={(theme) => inputStyle(theme, disabled)}
            />
          </StyledContainer>
          {showErrors && fieldState.error && (
            <p css={errorTextStyle}>{fieldState.error?.message}</p>
          )}
        </div>
      )}
    />
  );
}

export default TextInput;

const inputStyle = (theme: Theme, disabled: boolean) => css`
  width: 100%;
  height: 40px;
  border: none;
  flex-grow: 1;
  outline: none;
  border-radius: ${theme.borderRadius};
  background-color: transparent;
  cursor: ${disabled ? 'not-allowed' : 'auto'};
  ${theme.textStyles.bodyBlackSmall}

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition:
      background-color 600000s 0s,
      color 600000s 0s;
  }
  &[data-autocompleted] {
    background-color: transparent !important;
  }
`;
