import { Box, Typography } from '@material-ui/core'
import React from 'react'
import ButtonUI from '_src/components/Fields/ButtonUI'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import TableUI from '_src/components/TableUI'

function createData (name, calories, fat, carbs, protein) {
  return {
    id: name +
    calories +
    fat +
    carbs + Date.now() + Math.random() +
    protein,
    name,
    calories,
    fat,
    carbs,
    protein,
    test: protein,
    testw: protein
  }
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0)
]

const columns = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)', width: 500, cell: (props) => <Box style={{ color: 'red' }}>{props.row.name}</Box> },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories', width: 500 },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)', width: 500 },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)', width: 500 },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)', width: 500 },
  { id: 'test', numeric: true, disablePadding: false, label: 'Protein (g)', width: 500 },
  { id: 'testw', numeric: true, disablePadding: false, label: 'Protein (g)', width: 500 }
]

function StyleGuide () {
  return (
    <Box>
      {/* table UI */}
      <Box p={4}>
        <TableUI
          showSorted={true}
          columns={columns}
          rows={rows} />
      </Box>

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
