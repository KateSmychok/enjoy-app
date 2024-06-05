import { Theme } from '@emotion/react';

const defaultFontSizes = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '40px',
};

const defaultLineHeights = {
  sm: '1.2',
  md: '1.5',
};

const defaultFontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
};

const defaultFontStyles = {
  normal: 'normal',
  italic: 'italic',
};

const baseColors = {
  primary: '#6cd575',
  gold: '#Ebd62b',
  background: 'white',
  backgroundGray: '#edecf1',
  backgroundAlt: '#f5f5f6',
  primaryText: 'white',
  text: '#000000',
  textSecondary: '#808080',
  textTertiary: '#333333',
  textGray: '#a6a6a6',
  textDarkGray: '#b3b3b3',
  textDisabled: '#cccccc',
  textDisabledWhiteBg: '#d9d9d9',
  border: '#000000',
  borderDisabled: '#e6e6e6',
  title: '#4d4d4d',
  error: '#e32636',
  shadow: '#a6a6a6',
};

const defaultColours = {
  background: baseColors.background,
  backgroundAlt: baseColors.backgroundAlt,
  border: baseColors.border,
  shadow: baseColors.shadow,

  infoBorder: '#007cba',
  infoBackground: '#edf9ff',

  warningBorder: '#f0a23f',
  warningBackground: '#f7f4ed',

  primary: baseColors.primary,
  primaryText: baseColors.primaryText,
  error: baseColors.error,

  toasts: {
    success: {
      backgroundColor: '#d7EED6',
      color: '#00D93A',
    },

    error: {
      backgroundColor: '#f2dedf',
      color: '#e32636',
    },
  },
};

const defaultTheme: Theme = {
  fontSizes: defaultFontSizes,
  colours: defaultColours,
  fontWeights: defaultFontWeights,
  fontStyles: defaultFontStyles,
  textStyles: {
    bodyBlackSmall: {
      fontSize: defaultFontSizes.sm,
      lineHeight: defaultLineHeights.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.normal,
    },
    bodyBlackMiddle: {
      fontSize: defaultFontSizes.md,
      lineHeight: defaultLineHeights.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.normal,
    },
    bodyBlackLarge: {
      fontSize: defaultFontSizes.lg,
      lineHeight: defaultLineHeights.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.normal,
    },
    bodyWhiteSmall: {
      fontSize: defaultFontSizes.sm,
      lineHeight: defaultLineHeights.md,
      color: baseColors.primaryText,
      fontWeight: defaultFontWeights.normal,
    },
    titleS: {
      fontSize: defaultFontSizes.lg,
      lineHeight: defaultLineHeights.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.normal,
    },
    titleM: {
      fontSize: defaultFontSizes.xl,
      lineHeight: defaultLineHeights.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.normal,
    },
    titleL: {
      fontSize: defaultFontSizes.xxl,
      lineHeight: defaultLineHeights.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.normal,
    },
    titleBook: {
      fontSize: defaultFontSizes.sm,
      lineHeight: defaultLineHeights.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.normal,
    },
    labelSmall: {
      fontSize: defaultFontSizes.sm,
      color: baseColors.textTertiary,
      fontWeight: defaultFontWeights.normal,
    },
    errorSmall: {
      fontSize: defaultFontSizes.sm,
      color: baseColors.error,
      fontWeight: defaultFontWeights.normal,
    },
  },
  buttons: {
    primary: {
      background: baseColors.primary,
      backgroundDisabled: baseColors.backgroundAlt,
      padding: '0 24px',
      textStyle: {
        color: baseColors.primaryText,
        fontSize: defaultFontSizes.md,
        fontWeight: defaultFontWeights.medium,
      },
      textStyleDisabled: {
        color: baseColors.textDisabled,
        fontSize: defaultFontSizes.md,
        fontWeight: defaultFontWeights.medium,
      },
      textStyleDisabledAlt: {
        color: baseColors.textDarkGray,
        fontSize: defaultFontSizes.md,
        fontWeight: defaultFontWeights.medium,
      },
    },
    primary_outlined: {
      background: '#ffffff',
      backgroundDisabled: '#ffffff',
      textStyle: {
        color: baseColors.primary,
        fontSize: defaultFontSizes.md,
        fontWeight: defaultFontWeights.medium,
      },
      textStyleDisabled: {
        color: baseColors.textDisabledWhiteBg,
        fontSize: defaultFontSizes.md,
        fontWeight: defaultFontWeights.medium,
      },
      border: `2px solid ${baseColors.primary}`,
      borderDisabled: `2px solid ${baseColors.borderDisabled}`,
    },
    secondary: {
      background: baseColors.backgroundGray,
      backgroundDisabled: baseColors.backgroundAlt,
      padding: '0 24px',
      textStyle: {
        color: baseColors.title,
        fontSize: defaultFontSizes.md,
        fontWeight: defaultFontWeights.medium,
      },
      textStyleDisabled: {
        color: baseColors.textDisabled,
        fontSize: defaultFontSizes.md,
        fontWeight: defaultFontWeights.medium,
      },
    },
    invisible: {
      background: 'inherit',
      textStyle: {
        color: baseColors.background,
        fontSize: defaultFontSizes.md,
        fontWeight: defaultFontWeights.normal,
      },
    },
  },
  fontFamilies: {
    sansSerif: '"Roboto", Helvetica, Arial, sans-serif',
  },
  breakpoints: {
    md: '765px',
    lg: '992px',
    xl: '1540px',
  },
  spacing: {
    xxxs: '2px',
    xxs: '4px',
    xs: '8px',
    sm: '16px',
    md: '32px',
    lg: '48px',
  },
  borderRadius: '6px',
};

export { defaultTheme };
