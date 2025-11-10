import { ReactNode, TableHTMLAttributes } from 'react'

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  headerCells: {
    children?: ReactNode
    orderable?: boolean
    width?: string
  }[]
  itemRows: {
    cells: { children?: ReactNode; value: string }[]
    value: string
  }[]
}

export type HeaderProps = {
  $width: TableProps['headerCells'][number]['width']
}

export type UseTableProps = {
  headerCells: TableProps['headerCells']
  itemRows: TableProps['itemRows']
}
