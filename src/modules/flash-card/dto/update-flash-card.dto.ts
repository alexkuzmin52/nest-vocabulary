import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateFlashCardDto {
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
}
