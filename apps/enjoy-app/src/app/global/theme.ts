import { Theme } from '@emotion/react';

const defaultFontSizes = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '28px',
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

const baseColors = {
  primary: '#9a26d6',
  backgroundDisabled: '#f5f5f6',
  backgroundDisabledAlt: '#dcd9e4',
  background: 'white',
  border: '#edecf1',
  controlBorder: '#dcd9e4',
  primaryText: 'white',
  icon: '#968caf',

  text: '#000000',
  textSecondary: '#808080',
  textTertiary: '#333333',
  textGray: '#a6a6a6',
  textDarkGray: '#b3b3b3',
  textDisabled: '#cccccc',
  textDisabledWhiteBg: '#d9d9d9',

  title: '#4d4d4d',
  passPurple: '#6d1b98',
  error: '#e31c4a',

  statusGood: '#e8f1e8',
  statusNeutral: '#e6e6e6',
  statusNote: '#f7f4ed',
  statusBad: '#f2dedf',
};

const defaultColours = {
  background: baseColors.background,
  backgroundNonActive: baseColors.backgroundDisabled,
  border: baseColors.border,
  controlBorder: baseColors.controlBorder,
  careIcon: 'white',
  carerIcon: baseColors.textGray,
  danger: 'red',

  infoBorder: '#007cba',
  infoBackground: '#edf9ff',

  calendarBackground: baseColors.border,
  calendarActiveBackground: baseColors.passPurple,
  calendarActiveText: 'white',
  calendarCancel: '#6d1b98',
  calendarWeekend: '#271c4a0d',

  darkBorder: '#cac6d7',
  highlight: '#b173c7',
  icon: baseColors.icon,
  primary: baseColors.primary,
  primaryText: baseColors.primaryText,
  primaryDark: baseColors.passPurple,
  error: baseColors.error,

  toasts: {
    error: {
      backgroundColor: 'rgb(238, 214, 215)',
      color: 'rgb(217, 0, 58)',
    },
  },
};

const defaultTheme: Theme = {
  fontSizes: defaultFontSizes,
  colours: defaultColours,
  fontWeights: defaultFontWeights,
  textStyles: {
    bodyBlackSmall: {
      fontSize: defaultFontSizes.sm,
      lineHeight: defaultLineHeights.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.normal,
    },
    bodyBlackSmallMedium: {
      fontSize: defaultFontSizes.sm,
      color: baseColors.text,
      fontWeight: defaultFontWeights.medium,
    },
    bodyBlack: {
      fontSize: defaultFontSizes.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.normal,
    },
    bodyBlackMedium: {
      fontSize: defaultFontSizes.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.medium,
    },
    bodyBlackSemibold: {
      fontSize: defaultFontSizes.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.semibold,
    },
    bodyBlackLargeMedium: {
      fontSize: defaultFontSizes.lg,
      color: baseColors.text,
      fontWeight: defaultFontWeights.medium,
    },
    bodyDarkGray: {
      fontSize: defaultFontSizes.md,
      color: baseColors.textTertiary,
      fontWeight: defaultFontWeights.normal,
    },
    bodyDarkGrayMedium: {
      fontSize: defaultFontSizes.md,
      color: baseColors.textTertiary,
      fontWeight: defaultFontWeights.medium,
    },
    bodyGray: {
      fontSize: defaultFontSizes.md,
      color: baseColors.textGray,
      fontWeight: defaultFontWeights.normal,
    },
    bodyGraySmall: {
      fontSize: defaultFontSizes.sm,
      color: baseColors.textGray,
      fontWeight: defaultFontWeights.normal,
    },
    bodyGrayMedium: {
      fontSize: defaultFontSizes.md,
      color: baseColors.textGray,
      fontWeight: defaultFontWeights.medium,
    },
    label: {
      fontSize: defaultFontSizes.md,
      color: baseColors.textTertiary,
      fontWeight: defaultFontWeights.normal,
    },
    labelSmall: {
      fontSize: defaultFontSizes.sm,
      color: baseColors.textTertiary,
      fontWeight: defaultFontWeights.normal,
    },
    linkButtonText: {
      fontSize: defaultFontSizes.lg,
      fontWeight: defaultFontWeights.medium,
      color: baseColors.primary,
    },
    minorGrey: {
      fontSize: defaultFontSizes.xs,
      color: baseColors.textSecondary,
      fontWeight: defaultFontWeights.normal,
    },
    minorBlack: {
      fontSize: defaultFontSizes.xs,
      color: '#000000',
      fontWeight: defaultFontWeights.normal,
    },
    navMenuItemActive: {
      fontSize: defaultFontSizes.md,
      color: baseColors.text,
      fontWeight: defaultFontWeights.medium,
    },
    navMenuItem: {
      fontSize: defaultFontSizes.md,
      color: baseColors.textTertiary,
      fontWeight: defaultFontWeights.normal,
    },
    summaryText: {
      fontSize: defaultFontSizes.sm,
      color: baseColors.text,
      fontWeight: defaultFontWeights.normal,
    },
    summaryTextBlack: {
      fontSize: defaultFontSizes.sm,
      color: baseColors.text,
      fontWeight: defaultFontWeights.medium,
    },
    title: {
      fontSize: defaultFontSizes.md,
      color: baseColors.title,
      fontWeight: defaultFontWeights.normal,
    },
    titleMedium: {
      fontSize: defaultFontSizes.md,
      color: baseColors.title,
      fontWeight: defaultFontWeights.medium,
    },
    titleXS: {
      fontSize: defaultFontSizes.xs,
      color: baseColors.title,
      fontWeight: defaultFontWeights.normal,
    },
    titleLarge: {
      fontSize: defaultFontSizes.lg,
      color: baseColors.title,
      fontWeight: defaultFontWeights.medium,
    },
    titleXL: {
      fontSize: defaultFontSizes.xl,
      color: baseColors.title,
      fontWeight: defaultFontWeights.normal,
    },
    titleXSMedium: {
      fontSize: defaultFontSizes.xs,
      color: baseColors.title,
      fontWeight: defaultFontWeights.medium,
    },
    titleXLMedium: {
      fontSize: defaultFontSizes.xl,
      color: baseColors.title,
      fontWeight: defaultFontWeights.medium,
    },
    titleXLLight: {
      fontSize: defaultFontSizes.xl,
      color: baseColors.title,
      fontWeight: defaultFontWeights.light,
    },
    titleXLSemiBold: {
      fontSize: defaultFontSizes.xl,
      color: baseColors.title,
      fontWeight: defaultFontWeights.semibold,
    },
    titleXXL: {
      fontSize: defaultFontSizes.xxl,
      color: baseColors.title,
      fontWeight: defaultFontWeights.normal,
    },
    titleXXLLight: {
      fontSize: defaultFontSizes.xxl,
      color: baseColors.title,
      fontWeight: defaultFontWeights.light,
    },
    titleXXLMedium: {
      fontSize: defaultFontSizes.xxl,
      color: baseColors.title,
      fontWeight: defaultFontWeights.medium,
    },
    titleXXLSemiBold: {
      fontSize: defaultFontSizes.xxl,
      color: baseColors.title,
      fontWeight: defaultFontWeights.semibold,
    },
  },
  buttons: {
    primary: {
      background: baseColors.primary,
      backgroundDisabled: baseColors.backgroundDisabled,
      backgroundDisabledAlt: baseColors.backgroundDisabledAlt,
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
      borderDisabled: `2px solid ${baseColors.statusNeutral}`,
    },
    secondary: {
      background: baseColors.border,
      backgroundDisabled: baseColors.backgroundDisabled,
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
      background: baseColors.background,
      textStyle: {
        color: baseColors.icon,
        fontSize: defaultFontSizes.md,
        fontWeight: defaultFontWeights.normal,
      },
    },
  },
  fontFamilies: {
    sansSerif: '"Roboto", Helvetica, Arial, sans-serif',
    monospace: 'Menlo, Monaco, Consolas, "Courier New", monospace',
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
