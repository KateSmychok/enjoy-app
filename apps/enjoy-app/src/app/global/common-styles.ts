import { css, Theme } from '@emotion/react';

export const fullWidthStyle = () => css`
  width: 100%;
`;

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

export const labelStyle = (theme: Theme) => css`
  ${theme.textStyles.bodySmall};
  color: ${theme.colours.textBlack};
`;

export const errorTextStyle = (theme: Theme) => css`
  padding-top: 2px;
  ${theme.textStyles.errorSmall};
`;
