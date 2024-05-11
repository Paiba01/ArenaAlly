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
import HttpError from '~/shared/http/error'
import { CreateMatchDto } from '~/match/dto/request/create-match'
import { CreateMatchHandler } from '~/match/application/commands/handlers/create-match'
import { CreateMatch } from '~/match/application/commands/create-match'
  
  @ApiTags('Matchs')
  @Controller('matchs')
  export class MatchsController {
    constructor(
      private readonly commandBus: CommandBus,
    ) {}

    @ApiOperation({ summary: 'Creates a Match' })
    @ApiCreatedResponse({
      description: 'Match created',
    })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    @Post()
    async createMatch(@Body() dto: CreateMatchDto) {
      const response: Awaited<ReturnType<CreateMatchHandler['execute']>> =
        await this.commandBus.execute(
          CreateMatch.with({
            id: dto.id,
            local: dto.local,
            visitor: dto.visitor,
            day: dto.day,
          }),
        )
  
      if (response.isErr())
        throw new BadRequestException(HttpError.fromException(response.error))
    } 
  }
  