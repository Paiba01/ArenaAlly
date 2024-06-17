import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class MatchDto {
  @ApiProperty()
  @IsString()
  readonly _id: string

  @ApiProperty()
  @IsString()
  readonly local: string

  @ApiProperty()
  @IsString()
  readonly visitor: string

  @ApiProperty()
  @IsNumber()
  readonly day: number
}

