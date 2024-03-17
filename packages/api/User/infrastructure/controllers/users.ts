import {
    BadRequestException,
    Body,
    Controller,
    Post
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger'
import { CreateUser } from '~/User/application/commands/create-user'
import { CreateUserHandler } from '~/User/application/commands/handlers/create-user'
import { CreateUserDto } from '~/User/dto/request/create-user'
import HttpError from '~/shared/http/error'
  
  @ApiTags('Users')
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly commandBus: CommandBus,
    ) {}
  
    @ApiOperation({ summary: 'Creates an User' })
    @ApiCreatedResponse({
      description: 'User created',
    })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    @Post()
    async createUser(@Body() dto: CreateUserDto) {
      const response: Awaited<ReturnType<CreateUserHandler['execute']>> =
        await this.commandBus.execute(
          CreateUser.with({
            id: dto.id,
            name: dto.name,
            email: dto.email,
            password: dto.password,
          }),
        )
  
      if (response.isErr())
        throw new BadRequestException(HttpError.fromException(response.error))
    } 
  }
  