import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import useStyles from './styles'

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
    showSorted,
    sortIconPosition,
    isCheckBoxs
  } = props

  const classes = useStyles()

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  console.log('isCheckBoxs : ', isCheckBoxs)

  return (
    <TableHead>
      <TableRow>
        {
          isCheckBoxs && <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
        }
        {columns.map((headCell) => (
          <TableCell
            key={headCell?.id}
            style={{
              width: headCell.width,
              flexDirection: sortIconPosition && 'row'
            }}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell?.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell?.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell?.id}
              direction={orderBy === headCell?.id ? order : 'asc'}
              onClick={createSortHandler(headCell?.id)}
            >
              {headCell?.label}
              {orderBy === headCell?.id && showSorted
                ? (
                  <Typography
                    variant="body2">
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Typography>
                )
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.defaultProps = {
  showSorted: true,
  isCheckBoxs: true,
  order: 'asc',
  orderBy: 'id',
  sortIconPosition: 'right'
}

EnhancedTableHead.propTypes = {
  showSorted: PropTypes.bool.isRequired,
  isCheckBoxs: PropTypes.bool.isRequired,
  sortIconPosition: PropTypes.oneOf([ 'right', 'left' ]).isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf([ 'asc', 'desc' ]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired
}

export default EnhancedTableHead
