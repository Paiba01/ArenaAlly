import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly id: string

  @ApiProperty()
  @IsString()
  readonly name: string

  @ApiProperty()
  @IsString()
  readonly email: string

  @ApiProperty()
  @IsString()
  readonly password: string
}