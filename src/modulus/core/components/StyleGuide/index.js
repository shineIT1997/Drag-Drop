import { Box, Typography } from '@material-ui/core'
import React from 'react'

function StyleGuide () {
  return (
    <Box p={4}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="subtitle1">subtitle 1</Typography>
      <Typography variant="subtitle2">subtitle 2</Typography>
      <Typography variant="body1">body 1</Typography>
      <Typography variant="body2">body 2</Typography>
    </Box>
  )
}

export default StyleGuide
