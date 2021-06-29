const { makeStyles } = require('@material-ui/core')

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },

  highlight: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.error[200]
  },

  title: {
    flex: '1 1 100%'
  }
}))

export default useToolbarStyles
