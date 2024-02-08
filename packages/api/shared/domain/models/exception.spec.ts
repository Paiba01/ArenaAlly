import { itIsAnException } from '~/test/closures/shared/domain/exception'

import Exception from './exception'

describe('Exception', () => {
  const message = 'message'
  const exception = Exception.with(message)

  itIsAnException(exception)

  it.concurrent('can be created', () => {
    expect(exception.message).toBe(message)
  })
})
