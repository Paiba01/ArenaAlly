import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsString } from "class-validator"

export class EditUserDto {
    @ApiProperty()
    @IsString()
    readonly name: string
  
    @ApiProperty()
    @IsString()
    readonly email: string
  
    @ApiProperty()
    @IsString()
    readonly password: string

    @ApiProperty()
    @IsBoolean()
    readonly isActive: boolean

    @ApiProperty()
    @IsBoolean()
    readonly isAdmin: boolean
}