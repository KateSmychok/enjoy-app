import { css, Theme } from '@emotion/react';
import logo from '@assets/icons/logo.svg';
import { Button } from '@global/components/buttons';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { RootState } from '@store/store';
import { ButtonType } from '@global/utils/enum';
import { authSliceActions } from '@store/reducers/auth-slice';
import { Link } from 'react-router-dom';
import { userSliceActions } from '@store/reducers/user-slice';
import { useApiClient } from '@global/modules/api-client';
import { UserDto } from '@generated/models';
import { rowContainerStyle, yCenteredStyle } from '@global/common-styles';
import profileIcon from '@assets/icons/profile.svg';
import loginIcon from '@assets/icons/login.svg';
import logoutIcon from '@assets/icons/logout.svg';

function Header() {
  const { isLoggedIn } = useAppSelector(
    (state: RootState) => state.authReducer,
  );
  const user = useAppSelector((state: RootState) => state.userReducer);

  const client = useApiClient();
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(authSliceActions.openAuthModal());
  };

  const handleLogoutClick = () => {
    dispatch(authSliceActions.logOut());
    dispatch(userSliceActions.setUser({} as UserDto));
    localStorage.removeItem('token');
    client.auth.logout();
  };

  return (
    <header css={(theme) => containerStyle(theme)}>
      <div css={wrapperStyle}>
        <Link to={'/'}>
          <img css={logoStyle} src={logo} />
        </Link>
        {!isLoggedIn ? (
          <Button variant={ButtonType.INVISIBLE} onClick={handleLoginClick}>
            <span>{'Login'}</span>
            <img src={loginIcon} alt={'Login'} css={iconStyle} />
          </Button>
        ) : (
          <div css={[rowContainerStyle, yCenteredStyle]}>
            <Link to={'/profile'} css={(theme) => [textStyle(theme), yCenteredStyle]}>
              <img src={profileIcon} alt={'Profile'} />
              <span>{user.name ?? user.email}</span>
            </Link>
            <Button variant={ButtonType.INVISIBLE} onClick={handleLogoutClick}>
              <span>{'Logout'}</span>
              <img src={logoutIcon} alt={'Logout'} css={iconStyle} />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

const containerStyle = (theme: Theme) => css`
  width: 100%;
  height: 70px;
  background-color: ${theme.colours.primary};
  color: ${theme.colours.textWhite};
  margin-bottom: 52px;
  text-decoration: none;
`;

const textStyle = (theme: Theme) => css`
  ${theme.textStyles.bodyMiddle};
  color: ${theme.colours.textWhite};
  text-decoration: none;
  padding-right: 24px;
`

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
  max-width: 120px;
`;

const iconStyle = () => css`
  padding-left: 8px;
`;

export default Header;
