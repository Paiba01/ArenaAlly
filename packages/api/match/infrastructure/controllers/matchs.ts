import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import HttpError from '~/shared/http/error'
import { DeleteMatchHandler } from '~/match/application/commands/handlers/delete-match'
import { DeleteMatch } from '~/match/application/commands/delete-match'
import { MatchDto } from '~/match/dto/response/match'
import { GetMatchs } from '~/match/application/queries/get-matchs'
import { GetMatch } from '~/match/application/queries/get-match'
import { GetMatchHandler } from '~/match/application/queries/handlers/get-match'
import { EditMatchDateDto } from '~/match/dto/request/edit-match'
import { EditMatchDate } from '~/match/application/commands/edit-match-date'
import { EditMatchDateHandler } from '~/match/application/commands/handlers/edit-match-date'

@ApiTags('Matchs')
@Controller('matchs')
export class MatchsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Gets all Matchs' })
  @ApiOkResponse({
    description: 'Matchs',
    type: [MatchDto],
  })
  @Get()
  async getMatchs(): Promise<MatchDto[]> {
    return await this.queryBus.execute(GetMatchs.all())
  }

  @ApiOperation({ summary: 'Get a Match' })
  @ApiOkResponse({
    description: 'Match',
    type: MatchDto,
  })
  @Get(':id')
  async getMatch(@Param('id') id: string): Promise<MatchDto> {
    const response: Awaited<ReturnType<GetMatchHandler['execute']>> =
      await this.queryBus.execute(
        GetMatch.with({
          id,
        }),
      )

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))

    return response.value
  }

  @ApiOperation({ summary: 'Edits a match date' })
  @ApiOkResponse({
    description: 'Match date edited',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Put(':id')
  async editMatchDate(@Body() dto: EditMatchDateDto, @Param('id') id: string) {
    const response: Awaited<ReturnType<EditMatchDateHandler['execute']>> =
    await this.commandBus.execute(
      EditMatchDate.with({
        id,
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
