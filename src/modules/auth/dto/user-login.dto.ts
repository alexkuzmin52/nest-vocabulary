import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: 'User e-mail',
    example: 'your-email@somesite.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'pAsSwOrD' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
