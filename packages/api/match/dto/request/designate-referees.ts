import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class DesignateRefereesDto {

    @ApiProperty()
    @IsString()
    readonly referee1: string

    @ApiProperty()
    @IsString()
    readonly referee2: string
}