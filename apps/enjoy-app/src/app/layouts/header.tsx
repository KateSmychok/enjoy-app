import { css, Theme } from '@emotion/react';
import logo from '@assets/icons/logo.svg';
import { Button } from '@global/components/buttons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { ButtonType } from '@global/utils/enum';
import { authSliceActions } from '../store/reducers/auth-slice';

function Header() {
  const { isLoggedIn } = useAppSelector(
    (state: RootState) => state.authReducer,
  );

  const { name } = useAppSelector((state: RootState) => state.userReducer);

  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      dispatch(authSliceActions.openAuthModal());
    }
  };

  return (
    <header css={(theme) => containerStyle(theme)}>
      <div css={wrapperStyle}>
        <img css={logoStyle} src={logo} />
        <Button variant={ButtonType.INVISIBLE} onClick={handleLoginClick}>
          <span>{isLoggedIn ? name : 'Login'}</span>
        </Button>
      </div>
    </header>
  );
}

const containerStyle = (theme: Theme) => css`
  width: 100%;
  height: 100px;
  background-color: ${theme.colours.primary};
  ${theme.textStyles.bodyWhiteSmall};
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
