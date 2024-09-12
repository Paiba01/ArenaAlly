import {
    BadRequestException,
    Body,
    Controller,
    Delete,
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
import HttpError from '~/shared/http/error'

import { CreateCompetitionHandler } from '~/competition/application/commands/handlers/create-competition'
import { CreateCompetition } from '~/competition/application/commands/create-competition'
import { CreateCompetitionDto } from '~/competition/dto/request/create-competition'
import { CompetitionDto } from '~/competition/dto/response/competition'
import { GetCompetitions } from '~/competition/application/queries/get-competitions'
import { GetCompetition } from '~/competition/application/queries/get-competition'
import { GetCompetitionHandler } from '~/competition/application/queries/handlers/get-competition'
import { DeleteCompetitionHandler } from '~/competition/application/commands/handlers/delete-competition'
import { DeleteCompetition } from '~/competition/application/commands/delete-competition'
  
  @ApiTags('Competitions')
  @Controller('competitions')
  export class CompetitionsController {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
    ) {}
  
  @ApiOperation({ summary: 'Gets all Competitions' })
  @ApiOkResponse({
    description: 'Competitions',
    type: [CompetitionDto],
  })
  @Get()
  async getCompetitions(): Promise<CompetitionDto[]> {
    return await this.queryBus.execute(GetCompetitions.all())
  }

  @ApiOperation({ summary: 'Get a Competition' })
  @ApiOkResponse({
    description: 'Competition',
    type: CompetitionDto,
  })
  @Get(':id')
  async getCompetition(@Param('id') id: string): Promise<CompetitionDto> {
    const response: Awaited<ReturnType<GetCompetitionHandler['execute']>> =
      await this.queryBus.execute(
        GetCompetition.with({
          id,
        }),
      )

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))

    return response.value
  }

  @ApiOperation({ summary: 'Creates a Competition' })
  @ApiCreatedResponse({
    description: 'Competition created',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  async createCompetition(@Body() dto: CreateCompetitionDto) {
    const response: Awaited<ReturnType<CreateCompetitionHandler['execute']>> =
      await this.commandBus.execute(
        CreateCompetition.with({
          id: dto.id,
          name: dto.name,
          category: dto.category,
          teams: dto.teams,
          dateFrom: dto.dateFrom,
          dateTo: dto.dateTo
        }),
      )

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))
  }

  @ApiOperation({ summary: 'Deletes a Competition' })
  @ApiOkResponse({
    description: 'Competition deleted',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Delete(':id')
  async deleteCompetition(@Param('id') id: string) {
    const response: Awaited<ReturnType<DeleteCompetitionHandler['execute']>> =
      await this.commandBus.execute(DeleteCompetition.with({ id }))

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))
  }

}
  