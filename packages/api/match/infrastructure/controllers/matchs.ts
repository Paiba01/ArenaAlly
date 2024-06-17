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
import { CreateMatchDto } from '~/match/dto/request/create-match'
import { CreateMatchHandler } from '~/match/application/commands/handlers/create-match'
import { CreateMatch } from '~/match/application/commands/create-match'
import { DeleteMatchHandler } from '~/match/application/commands/handlers/delete-match'
import { DeleteMatch } from '~/match/application/commands/delete-match'
  
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

  @ApiOperation({ summary: 'Deletes a Match' })
  @ApiOkResponse({
    description: 'Match deleted',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Delete(':id')
  async deleteMatch(@Param('id') id: string) {
    const response: Awaited<ReturnType<DeleteMatchHandler['execute']>> =
      await this.commandBus.execute(DeleteMatch.with({ id }))

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))
  }
}
  