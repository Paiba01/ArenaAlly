import { ApiProperty } from '@nestjs/swagger'

import { Exception } from '~/shared/domain'

class HttpError {
  @ApiProperty()
  readonly error: Error

  private constructor(error: Error) {
    this.error = error
  }

  static fromException(exception: Exception): HttpError {
    return new this({
      message: exception.message,
      name: exception.name,
    })
  }
}

export default HttpError
