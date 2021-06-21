import { Box, Typography } from '@material-ui/core'
import React from 'react'
import ButtonUI from '_src/components/Fields/ButtonUI'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

function StyleGuide () {
  return (
    <Box>
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

      {/* Primary Button */}
      <Box
        display="flex"
        p={4}>

        <ButtonUI label="Button Primary" />

        <ButtonUI
          disabled
          label="Primary Disabled" />

        <ButtonUI
          height={32}
          label="Button Primary" />

        <ButtonUI
          disabled
          height={32}
          label="Primary Disabled" />

        <ButtonUI
          height={24}
          label="Button Primary" />

        <ButtonUI
          disabled
          height={24}
          label="Primary Disabled" />

      </Box>

      {/* Primary Button with icon */}
      <Box
        display="flex"
        p={4}>

        <ButtonUI
          iconPosition="end"
          Icon={<ArrowForwardIcon/>}
          label="Button Primary" />

        <ButtonUI
          disabled
          Icon={<ArrowForwardIcon/>}
          label="Primary Disabled" />

        <ButtonUI
          height={32}
          iconPosition="end"
          Icon={<ArrowForwardIcon/>}
          label="Button Primary" />

        <ButtonUI
          disabled
          height={32}
          Icon={<ArrowForwardIcon/>}
          label="Primary Disabled" />

        <ButtonUI
          height={24}
          iconPosition="end"
          Icon={<ArrowForwardIcon/>}
          label="Button Primary" />

        <ButtonUI
          disabled
          height={24}
          Icon={<ArrowForwardIcon/>}
          label="Primary Disabled" />
      </Box>

      {/* Secondary Button */}
      <Box
        display="flex"
        p={4}>

        <ButtonUI type="secondary" />

        <ButtonUI
          disabled
          type="secondary"/>

        <ButtonUI
          height={32}
          type="secondary" />

        <ButtonUI
          height={32}
          disabled
          type="secondary"/>

        <ButtonUI
          height={24}
          type="secondary" />

        <ButtonUI
          height={24}
          disabled
          type="secondary"/>
      </Box>

      {/* Secondary Button with icon */}

      <Box
        display="flex"
        p={4}>

        <ButtonUI
          iconPosition="end"
          Icon={<ArrowForwardIcon/>}
          type="secondary" />

        <ButtonUI
          Icon={<ArrowForwardIcon/>}
          disabled
          type="secondary"/>

        <ButtonUI
          iconPosition="end"
          Icon={<ArrowForwardIcon/>}
          height={32}
          type="secondary" />

        <ButtonUI
          Icon={<ArrowForwardIcon/>}
          height={32}
          disabled
          type="secondary"/>

        <ButtonUI
          iconPosition="end"
          Icon={<ArrowForwardIcon/>}
          height={24}
          type="secondary" />

        <ButtonUI
          Icon={<ArrowForwardIcon/>}
          height={24}
          disabled
          type="secondary"/>
      </Box>
    </Box>

  )
}

export default StyleGuide
