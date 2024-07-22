import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateMatchDto {
  @ApiProperty()
  @IsString()
  readonly id: string

  @ApiProperty()
  @IsString()
  readonly local: string

  @ApiProperty()
  @IsString()
  readonly visitor: string

  @ApiProperty()
  @IsString()
  readonly day: string
}