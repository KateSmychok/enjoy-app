import React from 'react';
import { css } from '@emotion/react';
import closeIcon from '@assets/icons/close.svg';

export interface BtnProps {
  title: string;
  disabled: boolean;
  onClick?: () => void;
}

interface Props {
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal = ({ onClose, children }: Props) => {
  return (
    <div css={layoutStyle}>
      <div css={contentStyle}>
        <div>{children}</div>
        <button type={'button'} css={closeBtnStyle} onClick={onClose}>
          {' '}
        </button>
      </div>
    </div>
  );
};

const layoutStyle = () => css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: rgba(60, 57, 72, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const contentStyle = () => css`
  width: 70vw;
  max-width: 600px;
  height: 400px;
  background-color: #fff;
  border-radius: 6px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const closeBtnStyle = () => css`
  width: 24px;
  height: 24px;
  background-image: url(${closeIcon});
  background-color: transparent;
  position: absolute;
  border: none;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;
