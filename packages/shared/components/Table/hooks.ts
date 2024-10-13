import { MouseEventHandler, useCallback, useMemo, useState } from 'react'

import { UseTableProps } from './types'

export const useTable = ({ headerCells, itemRows }: UseTableProps) => {
  const [asc, setAsc] = useState(true)
  const [order, setOrder] = useState(
    headerCells.findIndex(({ orderable }) => orderable),
  )

  const handleOrderBy: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget: { dataset } }) => {
      const value = Number(dataset.index)

      if (order === value) return setAsc((current) => !current)

      setOrder(value)
      setAsc(true)
    },
    [order],
  )

  const sortedItemRows = useMemo(
    () =>
      order < 0
        ? itemRows
        : itemRows.sort((a, b) => {
            const value = a.cells[order].value.localeCompare(
              b.cells[order].value,
              undefined,
              { numeric: true },
            )

            return asc ? value : -value
          }),
    [asc, itemRows, order],
  )

  return { asc, handleOrderBy, order, sortedItemRows }
}
