import React from 'react';
import { css } from '@emotion/react';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/close.svg';
import { ToastType } from '../../utils/enum';
import { toastVariants } from './constants';

interface Props {
  open: boolean;
  text: string;
  type: ToastType;
  onClose: () => void;
}

function Toast(props: Props) {
  return (
    <div css={container(props.open)}>
      <div css={content(props.type)}>
        <div>
          <img alt="Img" src={toastVariants[props.type].icon} />
          <span>{props.text}</span>
        </div>

        <button
          type={'button'}
          css={closeBtnStyle}
          onClick={() => props.onClose()}
          data-testid={'toast-close'}
        >
          <CloseIcon style={{ color: toastVariants[props.type].mainColor }} />
        </button>
      </div>
    </div>
  );
}

export default Toast;

const container = (open: boolean) => css`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1000;
  ${!open ? 'display: none' : ''}
`;

const content = (type: ToastType) => css`
  min-width: 400px;
  height: 64px;
  border: solid 1px ${toastVariants[type].mainColor};
  background-color: ${toastVariants[type].background};
  border-radius: 5px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 32px;

  & div {
    height: 24px;
    display: flex;
    align-items: center;
  }

  & img {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }

  & span {
    font-size: 16px;
    line-height: 1.5;
    color: #000;
    margin-right: 40px;
  }
`;

const closeBtnStyle = () => css`
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
