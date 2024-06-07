import React from "react";
import {css, Theme} from "@emotion/react";

interface IButtonProps {
  onClick: () => void;
  text: string;
  dataTestId?: string;
}

function LinkButton({
  onClick,
  text,
  dataTestId,
  }: IButtonProps) {
  return (
    <button
      css={(theme) => btnStyle(theme)}
      type={'button'}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {text}
    </button>
  )
}

const btnStyle = (theme: Theme) => css`
  ${theme.textStyles.bodySmall};
  color: ${theme.colours.primary};
  background: inherit;
  border: none;
  cursor: pointer;
`;

export default LinkButton;
