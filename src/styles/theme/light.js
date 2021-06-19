/**
*@file : lightTheme.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 02:09:08 | Wednesday, June 16, 2021
*@Editor : Visual Studio Code
*@summary : light theme
*/

import { createMuiTheme } from '@material-ui/core/styles'

export const primaryFont = 'Roboto, sans-serif'

export const theme = createMuiTheme({
  overrides: {
    MuiPickerDTTabs: {
      tabs: {
        '& svg': {
          color: '#fff'
        },
        '& .MuiTabs-indicator': {
          backgroundColor: 'unset'
        }
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        '& h6, h5, h4, h3, h2': {
          color: '#fff'
        }
      }
    },
    MuiPickersDay: {
      daySelected: {
        color: '#Fff'
      }
    }
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      tablet: 640,
      laptop: 1024,
      desktop: 1450
    }
  },
  palette: {
    primary: {
      main: '#0073C4',
      dark: '#005E9E',
      50: '#cce9ff',
      100: '#addbff',
      200: '#62aae3',
      300: '#4495d4',
      400: '#2784cc',
      500: '#0073C4',
      600: '#0066ab',
      700: '#005E9E',
      800: '#004f85',
      900: '#003961'
    },
    // secondary: {
    //   // main: '#3F3BED',
    //   // dark: '#000fb9',
    //   // 50: '#ede7fd',
    //   // 100: '#cfc5f9',
    //   // 200: '#ad9ef6',
    //   // 300: '#8876f3',
    //   // 400: '#6858f1',
    //   // 500: '#3F3BED',
    //   // 600: '#2a37e6',
    //   // 700: '#002fde',
    //   // 800: '#002ad7',
    //   // 900: '#000fb9'
    // },
    gray: {
      main: '#222222',
      100: '#f5f5f5',
      200: '#efefef',
      300: '#CECECE',
      400: '#9F9F9F',
      500: '#9f9f9f',
      600: '#767676',
      700: '#626262',
      800: '#333333',
      900: '#222222'
    },
    color: {
      error: '#EB0000',
      warning: '#F5B100',
      success: '#27AE60',
      disabled: '#EFEFEF',
      background: '#FAFAFD',
      white: '#fff',
      black: '#000'
    },
    shadow: {
      action: '#DCDCDC'
    }
  },

  typography: {
    fontFamily: primaryFont,

    h1: {
      fontSize: 95,
      fontWeight: 300,
      letterSpacing: -1.5,
      lineHeight: '129px',
      fontFamily: primaryFont
    },

    h2: {
      fontSize: 59,
      fontWeight: 300,
      letterSpacing: -0.5,
      lineHeight: '88px',
      fontFamily: primaryFont
    },

    h3: {
      fontSize: 48,
      fontWeight: 'normal',
      lineHeight: '65px',
      fontFamily: primaryFont
    },

    h4: {
      fontSize: 34,
      fontWeight: 'normal',
      lineHeight: '46px',
      letterSpacing: 0.25,
      fontFamily: primaryFont
    },

    h5: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: '33px',
      fontFamily: primaryFont
    },

    h6: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: '27px',
      letterSpacing: 0.15,
      fontFamily: primaryFont
    },

    subtitle1: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '26px',
      letterSpacing: 0.15,
      fontFamily: primaryFont
    },

    subtitle2: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: '22px',
      letterSpacing: 0.1,
      fontFamily: primaryFont
    },

    body1: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: '26px',
      letterSpacing: 0.5,
      fontFamily: primaryFont
    },

    body2: {
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: '26px',
      letterSpacing: 0.25,
      fontFamily: primaryFont
    }
  },

  spacing: 8
})

