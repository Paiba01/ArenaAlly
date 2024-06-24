import Exception from '~/shared/domain/models/exception'

export const itIsAnException = (value: Exception) => {
  it.concurrent('is an exception', () => {
    expect(value instanceof Error).toBe(true)
    expect(value).toHaveProperty('message')
  })
}
