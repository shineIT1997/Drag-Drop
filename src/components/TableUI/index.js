import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isFunction } from 'lodash'

import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'

import EnhancedTableToolbar from './EnhacedTableToolbar/input'
import EnhancedTableHead from './EnhancedTableHead'

import useStyles from './style'

const TableUI = (props) => {
  const { columns, rows, dense, classOutside, showSorted, isCheckBoxs, isSelectorOnClickItem, components = {} } = props

  const {
    ToolBar,
    Footer
  } = components
  const tableRef = useRef(null)

  const tableWidth = columns.reduce((res, col) => parseInt(col.width) ? parseInt(res) + parseInt(col.width) : res, 0)

  const classes = useStyles()

  const [ selected, setSelected ] = useState([])

  const [ dataRender, setDataRender ] = useState({
    docs: [],
    page: 0,
    pages: 0,
    offset: 20,
    totalData: [],
    order: 'asc',
    orderBy: 'id'
  })

  const {
    page,
    pages,
    docs,
    offset,
    order,
    orderBy,
    totalData
  } = dataRender

  useEffect(() => {
    if (isEmpty(rows)) return

    handleFilterData()
  }, [
    rows,
    columns,
    page,
    pages,
    offset,
    order,
    orderBy
  ])

  const handleFilterData = () => {
    const docs = stableSort(rows, getComparator(order, orderBy))
      .slice(page * offset, page * offset + offset)

    setDataRender(prev => ({ ...prev, docs, totalData: rows }))
  }

  const findColumn = (id) => columns.find(col => col.id === id)

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [ el, index ])

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])

      if (order !== 0) return order
      return a[1] - b[1]
    })

    return stabilizedThis.map((el) => el[0])
  }

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const getComparator = (order, orderBy) => {
    const col = findColumn(orderBy)

    const comparatorFunc = isFunction(col?.sort) ? (a, b) => col?.sort(a, b) : descendingComparator

    return order === 'desc'
      ? (a, b) => comparatorFunc(a, b, orderBy)
      : (a, b) => -comparatorFunc(a, b, orderBy)
  }

  const handleRequestSort = (event, property) => {
    const { orderBy } = dataRender
    const isAsc = orderBy === property && order === 'asc'

    setDataRender(prev => ({ ...prev, orderBy: property, order: isAsc ? 'desc' : 'asc' }))
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const { totalData } = dataRender

      const newSelecteds = totalData.map((row) => row.id)

      setSelected(newSelecteds)
      return
    }

    setSelected([])
  }

  const handleChangePage = (event, newPage) => {
    setDataRender(prev => ({ ...prev, page: newPage }))
  }

  const handleChangeRowsPerPage = (event) => {
    const newOffset = parseInt(event.target.value, 10)
    const newPages = Math.ceil(totalData?.length / offset)
    const newDocs = totalData.slice(0, newOffset)

    setDataRender(prev => ({
      ...prev,
      page: 0,
      offset: newOffset,
      pages: newPages,
      docs: newDocs
    }))
  }

  const handleSelectItem = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  // const emptyRows = offset - Math.min(offset, totalData.length - page * offset)
  console.log('Math.max(tableWidth, tableRef?.current?.offsetWidth || 0) : ', Math.max(tableWidth, tableRef?.current?.offsetWidth || 0), tableWidth)

  return (
    <div>
      <Paper className={[ classes.paper, classOutside ].join(' ')}>
        <EnhancedTableToolbar
          title={props.title}
          numSelected={selected.length} />

        {Boolean(ToolBar?.type?.$$typeof) && <Box >{ToolBar}</Box>}

        <TableContainer>
          <Table
            ref={tableRef}
            style={{
              width: Math.max(tableWidth, tableRef?.current?.offsetWidth || 0)
            }}
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              order={order}
              columns={columns}
              orderBy={orderBy}
              rowCount={rows.length}
              numSelected={selected.length}
              showSorted={Boolean(showSorted)}
              isCheckBoxs={Boolean(isCheckBoxs)}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {docs
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => isSelectorOnClickItem && handleSelectItem(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {
                        isCheckBoxs && <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                      }

                      {columns.map((headCell) => {
                        const value = row[headCell.id]
                        const key = row.id + headCell.id

                        const Cell = headCell?.cell

                        return <TableCell
                          style={{
                            width: headCell.width
                          }}
                          key={key}
                          align={headCell.numeric ? 'right' : 'left'}>
                          {
                            Cell
                              ? <Cell
                                row={row}/>
                              : value
                          }
                        </TableCell>
                      })}
                    </TableRow>
                  )
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>

        {Boolean(Footer?.type?.$$typeof) && <Box >{Footer}</Box>}

        <TablePagination
          rowsPerPageOptions={[ 10, 20, 40 ]}
          component="div"
          count={totalData.length}
          rowsPerPage={offset}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

TableUI.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired
  // components: PropTypes.objectOf(PropTypes.shape({
  //   ToolBar: PropTypes.element.isRequired,
  //   Footer: PropTypes.element.isRequired
  // }))
}

export default TableUI
