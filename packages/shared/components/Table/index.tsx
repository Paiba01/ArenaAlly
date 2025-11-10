
import SortDownIcon from 'shared/assets/icons/sort-down.svg?react'
import SortUpIcon from 'shared/assets/icons/sort-up.svg?react'

import { useTable } from './hooks'
import { Cell, Component, Header, Orderable, Row, Unorderable } from './styles'
import { TableProps } from './types'

export const Table = ({ headerCells, itemRows, ...props }: TableProps) => {
  const { asc, handleOrderBy, order, sortedItemRows } = useTable({
    headerCells,
    itemRows,
  })

  console.log(headerCells);
  

  return (
    <Component {...props}>
      <thead>
        <tr>
          {headerCells.map(
            (
              headerCell,
              index,
            ) => (
              <Header
                $width={headerCell.width}
                aria-sort={
                  headerCell.orderable
                    ? order === index
                      ? asc
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                    : undefined
                }
                key={index}
              >
                {headerCell.orderable ? (
                  <Orderable
                    data-index={index}
                    onClick={handleOrderBy}
                  >
                    {headerCell.children}
                    {order === index && asc ? <SortDownIcon /> : <SortUpIcon />}
                  </Orderable>
                ) : (
                  <Unorderable>{headerCell.children}</Unorderable>
                )}
              </Header>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {sortedItemRows.map(({ cells, value }) => (
          <Row key={value}>
            {cells.map(({ children }, index) => (
              <Cell key={index}>{children}</Cell>
            ))}
          </Row>
        ))}
      </tbody>
    </Component>
  )
}

export type { TableProps }
