import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class MatchDto {
  @ApiProperty()
  @IsString()
  readonly _id: string

  @ApiProperty()
  @IsString()
  readonly competitionId: string

  @ApiProperty()
  @IsString()
  readonly local: string

  @ApiProperty()
  @IsString()
  readonly visitor: string

  @ApiProperty()
  @IsString()
  readonly referee1?: string

  @ApiProperty()
  @IsString()
  readonly referee2?: string

  @ApiProperty()
  @IsString()
  readonly day: string
}

