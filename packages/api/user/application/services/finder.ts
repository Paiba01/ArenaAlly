import { Result } from "neverthrow"
import { NotFoundUser } from "~/user/domain/exceptions/not-found"
import UserId from "~/user/domain/models/id"
import { UserDto } from "~/user/dto/response/user"

export type UsersFinder = {
  find(id: UserId): Promise<Result<UserDto, NotFoundUser>>
  getAll(): Promise<UserDto[]>
}
  
export const UsersFinder = 'USERS_FINDER'