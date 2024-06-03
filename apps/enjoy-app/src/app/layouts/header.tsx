import { css, Theme } from '@emotion/react';
import logo from '@assets/icons/logo.svg';

function Header() {
  return (
    <header css={(theme) => containerStyle(theme)}>
      <div css={wrapperStyle}>
        <img css={logoStyle} src={logo} />
      </div>
    </header>
  );
}

const containerStyle = (theme: Theme) => css`
  width: 100%;
  height: 100px;
  background-color: ${theme.colours.primary};
  margin-bottom: 52px;
`;

const wrapperStyle = () => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  height: 100%;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 1921px) {
    width: calc(100vw - 80px);
  }

  @media only screen and (max-width: 1200px) {
    width: calc(100vw - 40px);
  }
`;

const logoStyle = () => css`
  object-fit: contain;
  max-width: 150px;
`;

export default Header;
