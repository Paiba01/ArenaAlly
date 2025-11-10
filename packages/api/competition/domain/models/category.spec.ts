import { Err, Ok } from 'neverthrow'

import { Category } from './category'

describe('Category', () => {
  it.each(['ALEVIN', 'INFANTIL', 'CADETE', 'JUVENIL', 'SENIOR', 'VETERANO'])(
    'can be created from a valid category',
    (categoryValue) => {
      const category = Category.fromString(categoryValue)

      expect(category).toBeInstanceOf(Ok)
    },
  )

  it.concurrent('cannot be blank', () => {
    expect(Category.fromString(' ')).toBeInstanceOf(Err)
  })

  it.concurrent('cannot be a non valid string', () => {
    expect(Category.fromString('randomCategory')).toBeInstanceOf(Err)
  })
})
