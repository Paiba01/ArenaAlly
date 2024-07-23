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
  
  @ApiTags('Competitions')
  @Controller('competitions')
  export class CompetitionsController {
    constructor(
      private readonly commandBus: CommandBus,
    ) {}

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

}
  