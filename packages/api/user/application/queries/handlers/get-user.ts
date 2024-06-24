import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Result, err } from "neverthrow";

import { NotFoundUser } from "~/user/domain/exceptions/not-found";
import UserId from "~/user/domain/models/id";
import { UserDto } from "~/user/dto/response/user";
import { InvalidId } from "~/shared/domain";

import { UsersFinder } from "../../services/finder";
import { GetUser } from "../get-user";

@QueryHandler(GetUser)
export class GetUserHandler implements IQueryHandler {
    constructor(
        @Inject(UsersFinder) private readonly usersFinder: UsersFinder,
    ) {}

    async execute(
        query: GetUser
    ): Promise<Result<UserDto, InvalidId | NotFoundUser>> {
        const userId = UserId.fromString(query.id)
        if (userId.isErr()) return err(userId.error)

        return await this.usersFinder.find(userId.value)
    }
}