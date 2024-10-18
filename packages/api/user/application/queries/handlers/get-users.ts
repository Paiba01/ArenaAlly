import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { UserDto } from "~/user/dto/response/user";

import { UsersFinder } from "../../services/finder";
import { GetUsers } from "../get-users";

@QueryHandler(GetUsers)
export class GetUsersHandler implements IQueryHandler {
    constructor(
        @Inject(UsersFinder) private readonly usersFinder: UsersFinder,
    ) {}
    
    async execute(): Promise<UserDto[]> {
        return await this.usersFinder.getAll()
    }
}