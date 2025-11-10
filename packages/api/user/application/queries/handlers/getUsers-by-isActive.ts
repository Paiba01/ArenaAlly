import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { GetUsersByIsActive } from '../getUsers-by-isActive'
import { UsersFinder } from '../../services/finder'
import { UserDto } from '~/user/dto/response/user'


@QueryHandler(GetUsersByIsActive)
export class GetUsersByIsActiveHandler implements IQueryHandler {
  constructor(@Inject(UsersFinder) private readonly usersFinder: UsersFinder) {}

  async execute(): Promise<UserDto[]> {
    return await this.usersFinder.findByIsActive()
  }
}
