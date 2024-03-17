import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUser } from "../create-user";
import { InvalidId } from "~/shared/domain";
import InvalidUserName from "~/User/domain/exceptions/invalid-name";
import InvalidUserEmail from "~/User/domain/exceptions/invalid-email";
import InvalidUserPassword from "~/User/domain/exceptions/invalid-password";
import { Result, err, ok } from "neverthrow";
import UserId from "~/User/domain/models/id";
import UserName from "~/User/domain/models/name";
import UserEmail from "~/User/domain/models/email";
import UserPassword from "~/User/domain/models/password";
import User from "~/User/domain/models/user";
import { Inject } from "@nestjs/common";
import Users from "~/User/domain/services/users";

@CommandHandler(CreateUser)
export class CreateUserHandler implements ICommandHandler {
    constructor(@Inject(Users) private readonly users: Users) { }

    async execute(
        command: CreateUser,
    ): Promise<Result<void, InvalidId | InvalidUserName | InvalidUserEmail | InvalidUserPassword>> {
        const userId = UserId.fromString(command.id)
        if (userId.isErr()) return err(userId.error)

        const userName = UserName.fromString(command.name)
        if (userName.isErr()) return err(userName.error)

        const userEmail = UserEmail.fromString(command.email)
        if (userEmail.isErr()) return err(userEmail.error)

        const userPassword = UserPassword.fromString(command.password)
        if (userPassword.isErr()) return err(userPassword.error)

        const user = User.create({
            id: userId.value,
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
        })

        return ok(await this.users.create(user))

    }
}