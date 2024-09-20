import {
    BadRequestException,
    Body,
    Controller,
    Delete,
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
import HttpError from '~/shared/http/error'
import { DeleteMatchHandler } from '~/match/application/commands/handlers/delete-match'
import { DeleteMatch } from '~/match/application/commands/delete-match'
import { MatchDto } from '~/match/dto/response/match'
import { GetMatchs } from '~/match/application/queries/get-matchs'
import { GetMatch } from '~/match/application/queries/get-match'
import { GetMatchHandler } from '~/match/application/queries/handlers/get-match'
import { EditMatchDto } from '~/match/dto/request/edit-match'
import { EditMatchHandler } from '~/match/application/commands/handlers/edit-match'
import { EditMatch } from '~/match/application/commands/edit-match'
  
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

  @ApiOperation({ summary: 'Edits a match' })
  @ApiOkResponse({
    description: 'Match edited',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Put(':id')
  async editMatch(@Body() dto: EditMatchDto, @Param('id') id: string) {
    const updateData: any = { id };
    updateData.id=id;
    if (dto.competitionId !== undefined) updateData.competitionId = dto.competitionId;
    if (dto.local !== undefined) updateData.local = dto.local;
    if (dto.visitor !== undefined) updateData.visitor = dto.visitor;
    if (dto.day !== undefined) updateData.day = dto.day;
    if (dto.referee1 !== undefined) updateData.referee1 = dto.referee1;
    if (dto.referee2 !== undefined) updateData.referee2 = dto.referee2;

    const response = await this.commandBus.execute(
      EditMatch.with(updateData)
    );

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))
    
    return { message: 'Match edited successfully' };
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
  