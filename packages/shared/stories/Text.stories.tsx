import { Meta } from '@storybook/react'
import {
  Body1 as Body1Component,
  Body2 as Body2Component,
  Body2Props,
  Body3 as Body3Component,
  Body4 as Body4Component,
  Body4Props,
  ButtonCompact as ButtonCompactComponent,
  ButtonWide as ButtonWideComponent,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Input1 as Input1Component,
  Input2 as Input2Component,
  Input3 as Input3Component,
  LinkCompact as LinkCompactComponent,
  LinkWide as LinkWideComponent,
} from 'shared/components/Text'

const meta: Meta = {
  title: 'Atoms/Text',
}

export default meta

export const Heading1 = () => <H1>Text</H1>

export const Heading2 = () => <H2>Text</H2>

export const Heading3 = () => <H3>Text</H3>

export const Heading4 = () => <H4>Text</H4>

export const Heading5 = () => <H5>Text</H5>

export const Heading6 = () => <H6>Text</H6>

export const Body1 = () => <Body1Component>Text</Body1Component>

export const Body2 = (args: Body2Props) => (
  <Body2Component {...args}>Text</Body2Component>
)
Body2.argTypes = {
  highlighted: {
    control: 'boolean',
    table: { type: { summary: 'boolean' } },
    type: 'boolean',
  },
}

export const Body3 = () => <Body3Component>Text</Body3Component>

export const Body4 = (args: Body4Props) => (
  <Body4Component {...args}>Text</Body4Component>
)
Body4.argTypes = {
  highlighted: {
    control: 'boolean',
    table: { type: { summary: 'boolean' } },
    type: 'boolean',
  },
}

export const ButtonCompact = () => (
  <ButtonCompactComponent>Text</ButtonCompactComponent>
)

export const ButtonWide = () => <ButtonWideComponent>Text</ButtonWideComponent>

export const Input1 = () => <Input1Component>Text</Input1Component>

export const Input2 = () => <Input2Component>Text</Input2Component>

export const Input3 = () => <Input3Component>Text</Input3Component>

export const LinkCompact = () => (
  <LinkCompactComponent>Text</LinkCompactComponent>
)

export const LinkWide = () => <LinkWideComponent>Text</LinkWideComponent>
