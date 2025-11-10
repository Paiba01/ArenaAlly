import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsOptional } from "class-validator"

export class EditMatchDateDto {

    @ApiProperty()
    @IsString()
    readonly day: string
}