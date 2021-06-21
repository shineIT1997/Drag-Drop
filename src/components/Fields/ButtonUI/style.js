import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    border: '1px solid transparent',
    boxSizing: 'border-box',
    padding: theme.spacing(0, 1.5),
    minHeight: 24,
    width: props => props.width,
    height: props => props.height,
    borderRadius: theme?.spacing(0.5),
    display: 'flex',
    lineHeight: '20px',
    fontSize: 14,
    fontWeight: 600,
    margin: theme.spacing(0, 1),
    justifyContent: 'center',
    flexDirection: props => props.iconPosition === 'start' ? 'row-reverse' : 'row',
    alignItems: 'center',
    cursor: 'pointer',
    whiteSpace: 'nowrap',

    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    OUserSelect: 'none',
    userSelect: 'none'
  },

  primary: {
    color: theme?.palette?.grey[50],
    background: theme?.palette?.primary?.main,

    '&:hover': {
      background: theme?.palette?.primary[300]
    },

    '&:active': {
      background: theme?.palette?.primary?.dark
    },

    '&:disabled': {
      cursor: 'none',
      pointerEvents: 'none',
      color: theme.palette.secondary[600],
      background: `${theme?.palette?.secondary[300]} !important`
    }
  },

  secondary: {
    color: theme?.palette?.secondary.main,
    border: `1px solid ${theme.palette.secondary[500]}`,
    background: theme?.palette?.background?.paper,

    '&:hover': {
      color: theme?.palette?.primary[300],
      border: `1px solid ${theme.palette.primary[100]}`
    },

    '&:active': {
      color: theme?.palette?.primary?.dark,
      background: theme.palette.primary[50],
      border: `1px solid ${theme?.palette?.primary?.dark}`
    },

    '&:disabled': {
      cursor: 'none',
      pointerEvents: 'none',
      color: theme.palette.secondary[600],
      border: `1px solid ${theme.palette.secondary[400]}`,
      background: `${theme?.palette?.secondary[300]} !important`
    }
  },

  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(0, 0.5),

    '& svg': {
      width: props => props.height / 2,
      height: props => props.height / 2
    }
  }
}))

export default useStyles
