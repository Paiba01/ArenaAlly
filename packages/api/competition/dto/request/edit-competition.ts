import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class EditCompetitionDto {

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