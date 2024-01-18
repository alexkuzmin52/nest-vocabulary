import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @ApiProperty({ description: 'User name', example: 'Alex' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 32)
  name: string;

  @ApiProperty({
    description: 'User e-mail',
    example: 'your-email@somesite.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'pAsSwOrD' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
