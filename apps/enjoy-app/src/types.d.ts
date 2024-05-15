import '@emotion/react';

declare module '@emotion/react' {
  export interface ITextStyle {
    [key: string]: string | number;

    fontSize: string;
    color: string;
    fontWeight: number;
  }

  export interface IThemeButton {
    background: string;
    textStyle: ITextStyle;
    textStyleDisabled?: ITextStyle;
    textStyleDisabledAlt?: ITextStyle;
    backgroundDisabled?: string;
    backgroundDisabledAlt?: string;
    border?: string;
    borderDisabled?: string;
    padding?: string;
  }

  export interface IToastStyle {
    backgroundColor: string;
    color: string;
  }

  export interface Theme {
    colours: {
      background: string;
      backgroundNonActive: string;
      border: string;
      calendarBackground: string;
      calendarActiveBackground: string;
      calendarActiveText: string;
      calendarCancel: string;
      calendarWeekend: string;
      danger: string;
      careIcon: string;
      carerIcon: string;
      controlBorder: string;
      darkBorder: string;
      highlight: string;
      icon: string;
      primary: string;
      primaryDark: string;
      primaryText: string;
      error: string;
      infoBorder: string;
      infoBackground: string;

      toasts: {
        error: IToastStyle;
      };
    };
    buttons: {
      primary: IThemeButton;
      primary_outlined: IThemeButton;
      secondary: IThemeButton;
      invisible: IThemeButton;
    };
    fontFamilies: {
      sansSerif: string;
      monospace: string;
    };
    fontWeights: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
    };
    breakpoints: {
      md: string;
      lg: string;
      xl: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    spacing: {
      xxxs: string;
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    textStyles: {
      bodyBlack: ITextStyle;
      bodyBlackMedium: ITextStyle;
      bodyBlackSemibold: ITextStyle;
      bodyBlackLargeMedium: ITextStyle;
      bodyBlackSmall: ITextStyle;
      bodyBlackSmallMedium: ITextStyle;

      bodyGray: ITextStyle;
      bodyGraySmall: ITextStyle;
      bodyGrayMedium: ITextStyle;

      bodyDarkGray: ITextStyle;
      bodyDarkGrayMedium: ITextStyle;

      label: ITextStyle;
      labelSmall: ITextStyle;
      linkButtonText: ITextStyle;
      minorGrey: ITextStyle;
      minorBlack: ITextStyle;
      navMenuItem: ITextStyle;
      navMenuItemActive: ITextStyle;
      summaryText: ITextStyle;
      summaryTextBlack: ITextStyle;

      title: ITextStyle;
      titleMedium: ITextStyle;
      titleLarge: ITextStyle;
      titleXS: ITextStyle;

      titleXXL: ITextStyle;
      titleXXLLight: ITextStyle;
      titleXXLMedium: ITextStyle;
      titleXXLSemiBold: ITextStyle;

      titleXL: ITextStyle;
      titleXLMedium: ITextStyle;
      titleXLLight: ITextStyle;
      titleXLSemiBold: ITextStyle;

      titleXSMedium: ITextStyle;
    };
    borderRadius: string;
  }
}
