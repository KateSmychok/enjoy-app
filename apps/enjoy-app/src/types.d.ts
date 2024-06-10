import '@emotion/react';

declare module '@emotion/react' {
  export interface ITextStyle {
    [key: string]: string | number;

    fontSize: string;
    color?: string;
    fontWeight: number;
    fontStyle?: string;
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
      backgroundAlt: string;
      border: string;
      primary: string;
      textBlack: string;
      textWhite: string;
      textSecondary: string;
      error: string;
      shadow: string;
      infoBorder: string;
      infoBackground: string;

      toasts: {
        error: IToastStyle;
        success: IToastStyle;
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
    };
    fontWeights: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
    };
    fontStyles: {
      normal: string;
      italic: string;
    };
    breakpoints: {
      md: string;
      lg: string;
      xl: string;
    };
    fontSizes: {
      sm: string;
      md: string;
      lg: string;
      titleSm: string;
      titleMd: string;
      titleL: string;
      titleXl: string;
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
      bodySmall: ITextStyle;
      bodyMiddle: ITextStyle;
      bodyLarge: ITextStyle;
      errorSmall: ITextStyle;
      titleS: ITextStyle;
      titleM: ITextStyle;
      titleL: ITextStyle;
      titleItalicXL: ITextStyle;
      labelSmall: ITextStyle;
    };
    borderRadius: string;
  }
}
