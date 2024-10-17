import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetUserByEmail } from "../get-user-by-email"
import { UsersFinder } from "../../services/finder"
import { Inject } from "@nestjs/common"
import { err, Result } from "neverthrow"
import InvalidUserEmail from "~/user/domain/exceptions/invalid-email"
import { UserDto } from "~/user/dto/response/user"
import { NotFoundUser } from "~/user/domain/exceptions/not-found"
import UserEmail from "~/user/domain/models/email"

@QueryHandler(GetUserByEmail)
export class GetUserByEmailHandler implements IQueryHandler {
  constructor(
    @Inject(UsersFinder) private readonly usersFinder: UsersFinder,
  ) {}

  async execute(
    query: GetUserByEmail,
  ): Promise<Result<UserDto, InvalidUserEmail | NotFoundUser>> {
    const email = UserEmail.fromString(query.email)
    if (email.isErr()) return err(email.error)

    return await this.usersFinder.findByEmail(email.value)
  }
}