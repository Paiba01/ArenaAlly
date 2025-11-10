import styled, { css } from 'styled-components'

import { Body1Styles, Body2Styles } from '../Text'
import { HeaderProps } from './types'

export const CellPaddingStyles = css`
  padding: 0 0.5rem 0 1rem;
`

export const Cell = styled.td`
  ${CellPaddingStyles}
  border: 0.0625rem solid #ccdae0;
  vertical-align: middle;

  :first-child {
    border-left: 0;
  }

  :last-child {
    border-right: 0;
  }
`

export const CellNegativeMarginStyles = css`
  margin: 0 -0.5rem 0 -1rem;
`

export const Header = styled.th<HeaderProps>`
  ${Body2Styles}
  border: 0.0625rem solid #e5ebee;
  border-top: 0;
  height: 3rem;
  vertical-align: middle;
  text-align: unset;

  ${({ $width }) =>
    $width
      ? css`
          width: ${$width};
        `
      : null}

  :first-child {
    border-left: 0;
  }

  :last-child {
    border-right: 0;
  }

  svg {
    color: #a1b1ba;
    display: none;
  }

  :hover svg {
    display: revert;
  }
`

export const Orderable = styled.button`
  ${CellPaddingStyles}
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: max-content 1rem;
  height: 100%;
  width: 100%;
`

export const RowHeightStyles = css`
  height: 2.5rem;
`

export const Row = styled.tr`
  ${Body1Styles}
  ${RowHeightStyles}
  background-color: #f2f5f7;

  :hover {
    background-color: #ccdae0;

    ${Cell} {
      border-color: #f9fafb;
    }
  }
`

export const Unorderable = styled.div`
  ${CellPaddingStyles}
`

export const Component = styled.table`
  color: black;
  width: 100%;
 ${Header} {
    background-color: white;
  }

  ${Row} {
    :nth-child(even):not(:hover) {
      background-color: white;
    }

    :nth-child(odd):not(:hover) {
      background-color: #f9fafb;
    }

    ${Cell} {
      border-color: #e5ebee;
    }
  }
`
