import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put
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
import { EditUserDto } from '~/user/dto/request/edit-user'
import { EditUserHandler } from '~/user/application/commands/handlers/edit-user'
import { EditUser } from '~/user/application/commands/edit-user'
import { GetUserByEmailHandler } from '~/user/application/queries/handlers/get-user-by-email'
import { GetUserByEmail } from '~/user/application/queries/get-user-by-email'
import { GetUsersByIsActiveHandler } from '~/user/application/queries/handlers/getUsers-by-isActive'
import { GetUsersByIsActive } from '~/user/application/queries/getUsers-by-isActive'
  
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


    @ApiOperation({ summary: 'Get a User by email' })
    @ApiOkResponse({
      description: 'Users/',
      type: UserDto,
    })
    @Get('searchEmail/:email')
    async getUserByEmail(@Param('email') email: string): Promise<UserDto> {
      const response: Awaited<ReturnType<GetUserByEmailHandler['execute']>> =
        await this.queryBus.execute(
          GetUserByEmail.with({
            email,
          }),
        )
  
      if (response.isErr())
        throw new BadRequestException(HttpError.fromException(response.error))
  
      return response.value
    }


    @ApiOperation({ summary: 'Get all active users' })
    @ApiOkResponse({
        description: 'Active Users',
        type: [UserDto],
    })
    @Get('search/active')
    async getUsersByIsActive(): Promise<UserDto[]> {
      return await this.queryBus.execute(GetUsersByIsActive.all())
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


  @ApiOperation({ summary: 'Edits an User' })
  @ApiOkResponse({
    description: 'User edited',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Put(':id')
  async editUser(@Body() dto: EditUserDto, @Param('id') id: string) {
    const response: Awaited<ReturnType<EditUserHandler['execute']>> =
      await this.commandBus.execute(
        EditUser.with({
          id,
          name: dto.name,
          email: dto.email,
          password: dto.password,
          isActive: dto.isActive,
          isAdmin: dto.isAdmin,
        }),
      )

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))
  }
  }
  