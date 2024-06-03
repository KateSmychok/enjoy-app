import { css } from '@emotion/react';

export const rowContainerStyle = () => css`
  display: flex;
`;

export const columnContainerStyle = () => css`
  display: flex;
  flex-direction: column;
`;

export const spaceBetweenStyle = () => css`
  justify-content: space-between;
`;

export const centeredStyle = () => css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const xCenteredStyle = () => css`
  display: flex;
  justify-content: center;
`;

export const yCenteredStyle = () => css`
  display: flex;
  align-items: center;
`;
