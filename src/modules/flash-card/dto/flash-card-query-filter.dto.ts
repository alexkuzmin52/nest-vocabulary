import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class FlashCardQueryFilterDto {
  @ApiPropertyOptional({
    description: 'Word/expression in target language (e.g. English)',
    example: 'brother',
  })
  @IsOptional()
  @IsString()
  @Length(2, 256)
  front_side: string;

  @ApiPropertyOptional({
    description: 'Word/expression in native language (e.g. Russian)',
    example: 'брат',
    minLength: 2,
    maxLength: 256,
  })
  @IsOptional()
  @IsString()
  @Length(2, 256)
  back_side: string;

  @ApiPropertyOptional({
    description: 'Topic in target language (e.g. English)',
    example: 'family',
  })
  @IsOptional()
  @IsString()
  @Length(2, 256)
  topic: string;

  @ApiPropertyOptional({
    description: 'Topic in target language (e.g. English)',
    example: 'family',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  level: number;
  // counter: number;
  // failed: number;

}
