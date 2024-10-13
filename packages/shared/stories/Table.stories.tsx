import { Meta, StoryFn } from '@storybook/react'
import { Table } from 'shared/components/Table'

const meta: Meta<typeof Table> = {
  args: {
    headerCells: [
      {
        children: 'Name',
        orderable: true,
        width: '33%',
      },
      {
        children: 'Role',
        orderable: true,
        width: '67%',
      },
    ],
    itemRows: [
      {
        cells: [
          { children: 'Name 1', value: 'Name 1' },
          { children: 'Role 1', value: 'Role 1' },
        ],
        value: '1',
      },
      {
        cells: [
          { children: 'Name 2', value: 'Name 2' },
          { children: 'Role 2', value: 'Role 2' },
        ],
        value: '2',
      },
      {
        cells: [
          { children: 'Name 3', value: 'Name 3' },
          { children: 'Role 1', value: 'Role 1' },
        ],
        value: '3',
      },
      {
        cells: [
          { children: 'Name 4', value: 'Name 4' },
          { children: 'Role 1', value: 'Role 1' },
        ],
        value: '4',
      },
      {
        cells: [
          { children: 'Name 5', value: 'Name 5' },
          { children: 'Role 2', value: 'Role 2' },
        ],
        value: '5',
      },
    ],
  },
  component: Table,
  title: 'Molecules/Table',
}

export default meta

const Template: StoryFn<typeof Table> = (args) => <Table {...args} />

export const TableStory = Template.bind({})
