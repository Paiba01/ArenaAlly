import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { err, ok, Result } from "neverthrow";
import { InvalidId } from "~/shared/domain";
import InvalidUserEmail from "~/user/domain/exceptions/invalid-email";
import InvalidUserName from "~/user/domain/exceptions/invalid-name";
import InvalidUserPassword from "~/user/domain/exceptions/invalid-password";
import { NotFoundUser } from "~/user/domain/exceptions/not-found";
import Users from "~/user/domain/services/users";
import { UsersFinder } from "../../services/finder";
import UserId from "~/user/domain/models/id";
import UserName from "~/user/domain/models/name";
import UserEmail from "~/user/domain/models/email";
import UserPassword from "~/user/domain/models/password";
import User from "~/user/domain/models/user";
import { EditUser } from "../edit-user";

@CommandHandler(EditUser)
export class EditUserHandler implements ICommandHandler {
    constructor(
        @Inject(Users) private readonly users: Users,
        @Inject(UsersFinder) private readonly usersFinder: UsersFinder,
    ) {}
    
    async execute(
        command: EditUser,
    ): Promise<Result<void, InvalidId | InvalidUserName | InvalidUserEmail | InvalidUserPassword | NotFoundUser>> {
        const userId = UserId.fromString(command.id)
        if (userId.isErr()) return err(userId.error)

        const user = await this.usersFinder.find(userId.value)
        if (user.isErr()) return err(user.error)

        const userName = UserName.fromString(command.name)
        if (userName.isErr()) return err(userName.error)

        const userEmail = UserEmail.fromString(command.email)
        if (userEmail.isErr()) return err(userEmail.error)

        const userPassword = UserPassword.fromString(command.password)
        if (userPassword.isErr()) return err(userPassword.error)

        const editedUser = User.create({
            id: userId.value,
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
            isActive: command.isActive,
            isAdmin: command.isAdmin,
          })

        return ok(await this.users.edit(editedUser))
    }
}