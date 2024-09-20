import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsOptional } from "class-validator"

export class EditMatchDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly competitionId?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly local?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly visitor?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly referee1?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly referee2?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly day?: string
}