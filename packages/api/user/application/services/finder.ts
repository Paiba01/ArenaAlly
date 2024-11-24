import { Result } from "neverthrow"
import InvalidUserEmail from "~/user/domain/exceptions/invalid-email"
import { NotFoundUser } from "~/user/domain/exceptions/not-found"
import UserEmail from "~/user/domain/models/email"
import UserId from "~/user/domain/models/id"
import { UserDto } from "~/user/dto/response/user"

export type UsersFinder = {
  find(id: UserId): Promise<Result<UserDto, NotFoundUser>>
  getAll(): Promise<UserDto[]>
  findByEmail(email: UserEmail): Promise<Result<UserDto, InvalidUserEmail | NotFoundUser>>
  findByIsActive(): Promise<UserDto[]>
}
  
export const UsersFinder = 'USERS_FINDER'