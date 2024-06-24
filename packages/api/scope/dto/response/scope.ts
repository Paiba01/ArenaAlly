import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class ScopeDto {
  @ApiProperty()
  @IsString()
  readonly _id: string

  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsString()
  readonly name: string
}

export default ScopeDto
