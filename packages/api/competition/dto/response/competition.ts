import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'

export class CompetitionDto {
  @ApiProperty()
  @IsString()
  readonly _id: string

  @ApiProperty()
  @IsString()
  readonly name: string

  @ApiProperty()
  @IsString()
  readonly category: string

  @ApiProperty()
  @IsString()
  readonly dateFrom: string

  @ApiProperty()
  @IsString()
  readonly dateTo: string
}

