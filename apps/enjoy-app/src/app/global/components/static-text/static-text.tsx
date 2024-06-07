import { css, Theme } from '@emotion/react';

interface Props {
  text: string;
}

function StaticText({ text }: Props) {
  return <span css={(theme) => textStyle(theme)}>{text}</span>;
}

const textStyle = (theme: Theme) => css`
  ${theme.textStyles.bodySmall};
  color: ${theme.colours.textBlack};
`;

export default StaticText;
