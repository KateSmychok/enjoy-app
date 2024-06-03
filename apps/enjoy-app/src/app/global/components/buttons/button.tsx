import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { LoadingSpinner } from '../loaders';
import { ButtonType } from '../../utils/enum';

interface IButtonProps {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  variant: ButtonType;
  children: React.ReactNode;
  onClick?: (evt: React.MouseEvent) => void;
  disabled?: boolean;
  ariaLabel?: string;
  dataTestId?: string;
  loading?: boolean;
  disabledCursor?: string;
  transactionName?: string;
  alt?: boolean;
}

function ButtonComponent({
  id,
  children,
  onClick,
  disabled = false,
  variant = ButtonType.PRIMARY,
  type = 'button',
  ariaLabel,
  dataTestId,
  loading = false,
  transactionName,
  alt = false,
}: IButtonProps) {
  const theme = useTheme();

  return (
    <button
      id={id}
      type={type}
      onClick={(evt) => {
        if (onClick) {
          onClick(evt);
        }
      }}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      data-transaction-name={transactionName ? transactionName : ariaLabel}
      data-ignoreclick="true"
    >
      {!loading && children}
      {loading && (
        <div css={{ position: 'relative' }}>
          <div css={{ visibility: 'hidden' }}>
            <div css={{ display: 'flex' }}>{children}</div>
          </div>
          <div
            css={{
              position: 'absolute',
              top: 'calc(50% - 7px)',
              left: 'calc(50% - 20px)',
            }}
          >
            <LoadingSpinner
              size={10}
              color={
                theme.buttons[variant].textStyleDisabled.color ?? '#dcd9e4'
              }
            />
          </div>
        </div>
      )}
    </button>
  );
}

const Button = styled(ButtonComponent)`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 44px;
  min-width: 85px;
  justify-content: center;
  cursor: pointer;
  border-radius: 22px;
  white-space: nowrap;
  height: 44px;
  ${(props) => props.theme.buttons[props.variant].textStyle}
  background-color: ${(props) => props.theme.buttons[props.variant].background};
  border: ${(props) => props.theme.buttons[props.variant].border || '0'};
  padding: ${(props) =>
    props.theme.buttons[props.variant].padding || '8px 16px'};

  &:disabled {
    ${(props) =>
      props.alt
        ? props.theme.buttons[props.variant].textStyleDisabledAlt
        : props.theme.buttons[props.variant].textStyleDisabled}
    background-color: ${(props) =>
      props.alt
        ? props.theme.buttons[props.variant].backgroundDisabledAlt
        : props.theme.buttons[props.variant].backgroundDisabled};
    border: ${(props) =>
      props.theme.buttons[props.variant].borderDisabled || '0'};
    cursor: ${(props) => props.disabledCursor ?? 'not-allowed'};
  }
`;

export default Button;
