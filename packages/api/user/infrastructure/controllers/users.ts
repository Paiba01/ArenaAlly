import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger'
import { CreateUser } from '~/user/application/commands/create-user'
import { CreateUserHandler } from '~/user/application/commands/handlers/create-user'
import { CreateUserDto } from '~/user/dto/request/create-user'
import HttpError from '~/shared/http/error'
import { UserDto } from '~/user/dto/response/user'
import { GetUserHandler } from '~/user/application/queries/handlers/get-user'
import { GetUser } from '~/user/application/queries/get-user'
import { GetUsers } from '~/user/application/queries/get-users'
  
  @ApiTags('Users')
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
    ) {}
    
    @ApiOperation({ summary: 'Gets all Users' })
    @ApiOkResponse({
      description: 'Users',
      type: [UserDto],
    })
    @Get()
    async getUsers(): Promise<UserDto[]> {
      return await this.queryBus.execute(GetUsers.all())
    }

    @ApiOperation({ summary: 'Get a User' })
    @ApiOkResponse({
      description: 'Users',
      type: UserDto,
    })
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserDto> {
      const response: Awaited<ReturnType<GetUserHandler['execute']>> =
        await this.queryBus.execute(
          GetUser.with({
            id,
          }),
        )
  
      if (response.isErr())
        throw new BadRequestException(HttpError.fromException(response.error))
  
      return response.value
    }

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
  