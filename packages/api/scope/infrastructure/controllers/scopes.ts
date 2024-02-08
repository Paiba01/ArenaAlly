import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import CreateScope from '~/scope/application/commands/create-scope'
import DeleteScope from '~/scope/application/commands/delete-scope'
import EditScope from '~/scope/application/commands/edit-scope'
import CreateScopeHandler from '~/scope/application/commands/handlers/create-scope'
import DeleteScopeHandler from '~/scope/application/commands/handlers/delete-scope'
import EditScopeHandler from '~/scope/application/commands/handlers/edit-scope'
import GetScope from '~/scope/application/queries/get-scope'
import GetScopes from '~/scope/application/queries/get-scopes'
import GetScopeHandler from '~/scope/application/queries/handlers/get-scope'
import CreateScopeDto from '~/scope/dto/request/create-scope'
import EditScopeDto from '~/scope/dto/request/edit-scope'
import ScopeDto from '~/scope/dto/response/scope'
import HttpError from '~/shared/http/error'

@ApiTags('Scopes')
@Controller('scopes')
class ScopesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Gets all Scopes' })
  @ApiOkResponse({
    description: 'Scopes',
    type: [ScopeDto],
  })
  @Get()
  async getScopes(): Promise<ScopeDto[]> {
    return await this.queryBus.execute(GetScopes.all())
  }

  @ApiOperation({ summary: 'Get a Scope' })
  @ApiOkResponse({
    description: 'Scopes',
    type: ScopeDto,
  })
  @Get(':id')
  async getScope(@Param('id') id: string): Promise<ScopeDto> {
    const response: Awaited<ReturnType<GetScopeHandler['execute']>> =
      await this.queryBus.execute(
        GetScope.with({
          id,
        }),
      )

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))

    return response.value
  }

  @ApiOperation({ summary: 'Creates a Scope' })
  @ApiCreatedResponse({
    description: 'Scope created',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  async createScope(@Body() dto: CreateScopeDto) {
    const response: Awaited<ReturnType<CreateScopeHandler['execute']>> =
      await this.commandBus.execute(
        CreateScope.with({
          description: dto.description,
          id: dto.id,
          name: dto.name,
        }),
      )

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))
  }

  @ApiOperation({ summary: 'Edits a Scope' })
  @ApiOkResponse({
    description: 'Scope edited',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Put(':id')
  async editScope(@Body() dto: EditScopeDto, @Param('id') id: string) {
    const response: Awaited<ReturnType<EditScopeHandler['execute']>> =
      await this.commandBus.execute(
        EditScope.with({
          description: dto.description,
          id,
          name: dto.name,
        }),
      )

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))
  }

  @ApiOperation({ summary: 'Deletes a Scope' })
  @ApiOkResponse({
    description: 'Scope deleted',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Delete(':id')
  async deleteScope(@Param('id') id: string) {
    const response: Awaited<ReturnType<DeleteScopeHandler['execute']>> =
      await this.commandBus.execute(DeleteScope.with({ id }))

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))
  }
}

export default ScopesController
