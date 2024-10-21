import styled, { css } from 'styled-components'

import { Body2Props, Body4Props } from './types'

export const Body1Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.normal};
  line-height: ${({ theme }) => theme.font.lineHeights.default};
`

export const Body1ImportantStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary} !important;
  font-size: ${({ theme }) => theme.font.sizes.default} !important;
  font-weight: ${({ theme }) => theme.font.weights.normal} !important;
  line-height: ${({ theme }) => theme.font.lineHeights.default} !important;
`

export const Body1 = styled.span`
  ${Body1Styles}
`

export const Body2Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.semibold};
  line-height: ${({ theme }) => theme.font.lineHeights.default};
`

export const Body2HighlightedStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.bold};
  line-height: ${({ theme }) => theme.font.lineHeights.default};
`

export const Body2 = styled.span<Body2Props>`
  ${({ highlighted }) => (highlighted ? Body2HighlightedStyles : Body2Styles)}
`

export const Body3Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-style: italic;
  font-weight: ${({ theme }) => theme.font.weights.normal};
  line-height: ${({ theme }) => theme.font.lineHeights.default};
`

export const Body3 = styled.span`
  ${Body3Styles}
`

export const Body4Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.weights.normal};
  letter-spacing: 0.02em;
  line-height: 1rem;
`

export const Body4ImportantStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary} !important;
  font-size: ${({ theme }) => theme.font.sizes.small} !important;
  font-weight: ${({ theme }) => theme.font.weights.normal} !important;
  letter-spacing: 0.02em !important;
  line-height: 1rem !important;
`

export const Body4HighlightedStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.weights.medium};
  letter-spacing: 0.02em;
  line-height: 1rem;
`

export const Body4 = styled.span<Body4Props>`
  ${({ highlighted }) => (highlighted ? Body4HighlightedStyles : Body4Styles)}
`

export const ButtonCompactStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.weights.semibold};
  letter-spacing: 0.02em;
  line-height: 1.0625rem;
`

export const ButtonCompact = styled.span`
  ${ButtonCompactStyles}
`

export const ButtonWideStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.bold};
  letter-spacing: 0.02em;
  line-height: ${({ theme }) => theme.font.lineHeights.default};
`

export const ButtonWide = styled.span`
  ${ButtonWideStyles}
`

export const H1Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.xxxl};
  font-weight: ${({ theme }) => theme.font.weights.semibold};
  line-height: ${({ theme }) => theme.font.lineHeights.xxxl};
`

export const H1 = styled.h1`
  ${H1Styles}
`

export const H2Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.xxl};
  font-weight: ${({ theme }) => theme.font.weights.normal};
  line-height: ${({ theme }) => theme.font.lineHeights.xxl};
`

export const H2 = styled.h2`
  ${H2Styles}
`

export const H3Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.xl};
  font-weight: ${({ theme }) => theme.font.weights.bold};
  line-height: ${({ theme }) => theme.font.lineHeights.xl};
`

export const H3 = styled.h3`
  ${H3Styles}
`

export const H4Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-weight: ${({ theme }) => theme.font.weights.bold};
  line-height: ${({ theme }) => theme.font.lineHeights.large};
`

export const H4 = styled.h4`
  ${H4Styles}
`

export const H5Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.weights.normal};
  line-height: ${({ theme }) => theme.font.lineHeights.medium};
`

export const H5 = styled.h5`
  ${H5Styles}
`

export const H6Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.weights.bold};
  line-height: ${({ theme }) => theme.font.lineHeights.medium};
`

export const H6 = styled.h6`
  ${H6Styles}
`

export const Input1Styles = css`
  font-family: ${({ theme }) => theme.font.families.secondary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.normal};
  line-height: 1.25rem;
`

export const Input1ImportantStyles = css`
  font-family: ${({ theme }) => theme.font.families.secondary} !important;
  font-size: ${({ theme }) => theme.font.sizes.default} !important;
  font-weight: ${({ theme }) => theme.font.weights.normal} !important;
  line-height: 1.25rem !important;
`

export const Input1 = styled.span`
  ${Input1Styles}
`

export const Input2Styles = css`
  font-family: ${({ theme }) => theme.font.families.secondary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.semibold};
  line-height: 1.25rem;
`

export const Input2 = styled.span`
  ${Input2Styles}
`

export const Input3Styles = css`
  font-family: ${({ theme }) => theme.font.families.secondary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.weights.normal};
  line-height: 0.9375rem;
`

export const Input3 = styled.span`
  ${Input3Styles}
`

export const LinkCompactHoverStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.weights.normal};
  line-height: 1.0625rem;
`

export const LinkCompactStyles = css`
  ${LinkCompactHoverStyles}
  text-decoration: underline;

  :enabled:focus-visible,
  :enabled:hover {
    text-decoration: unset;
  }
`

export const LinkCompact = styled.span`
  ${LinkCompactStyles}
`

export const LinkWideHoverStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.normal};
  line-height: ${({ theme }) => theme.font.lineHeights.default};
`

export const LinkWideStyles = css`
  ${LinkWideHoverStyles}
  text-decoration: underline;

  :enabled:focus-visible,
  :enabled:hover {
    text-decoration: unset;
  }
`

export const LinkWide = styled.span`
  ${LinkWideStyles}
`

export type { Body2Props, Body4Props }
