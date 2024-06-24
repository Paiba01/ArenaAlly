import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class CreateScopeDto {
  @ApiProperty()
  @IsString()
  readonly id: string

  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsString()
  readonly name: string
}

export default CreateScopeDto
