import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateFlashCardDto {
  @ApiProperty({
    description: 'Word/expression in target language (e.g. English)',
    example: 'brother',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 256)
  front_side: string;

  @ApiProperty({
    description: 'Word/expression in native language (e.g. Russian)',
    example: 'брат',
    minLength: 2,
    maxLength: 256,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 256)
  back_side: string;

  @ApiProperty({
    description: 'Topic in target language (e.g. English)',
    example: 'family',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 256)
  topic: string;
}
