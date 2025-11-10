import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'


export class CreateCompetitionDto {
  @ApiProperty()
  @IsString()
  readonly id: string

  @ApiProperty()
  @IsString()
  readonly name: string

  @ApiProperty()
  @IsString()
  readonly category: string

  @ApiProperty()
  @IsArray()
  readonly teams: string[]

  @ApiProperty()
  @IsString()
  readonly dateFrom: string

  @ApiProperty()
  @IsString()
  readonly dateTo: string
}