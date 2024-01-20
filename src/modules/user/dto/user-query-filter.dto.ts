import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserRoleEnum, UserStatusEnum } from '../../../constants';

export class UserQueryFilterDto {
  @ApiPropertyOptional({ description: 'User name', example: 'Alex' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 32)
  name: string;

  // @ApiPropertyOptional({ description: 'User surname', example: 'Kuzmin' })
  // @IsNotEmpty()
  // @IsString()
  // @Length(2, 32)
  // surname?: string;

  // @ApiPropertyOptional({
  //   description: 'User e-mail',
  //   example: 'your-email@somesite.com',
  // })
  // @IsOptional()
  // @IsNotEmpty()
  // @IsString()
  // @IsEmail()
  // email: string;

  @ApiPropertyOptional({
    description: 'User role',
    example: 'admin',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: string;

  // @ApiPropertyOptional({
  //   description: 'Minimum user age',
  //   example: '5',
  // })
  // @IsOptional()
  // @IsNotEmpty()
  // @IsInt()
  // @IsPositive()
  // ageMin: number;
  //
  // @ApiPropertyOptional({
  //   description: 'Maximum user age',
  //   example: '115',
  // })
  // @IsOptional()
  // @IsNotEmpty()
  // @IsInt()
  // @IsPositive()
  // ageMax: number;

  // @ApiPropertyOptional({
  //   description: 'User gender',
  //   example: 'male',
  // })
  // @IsOptional()
  // @IsNotEmpty()
  // @IsEnum(UserGenderEnum)
  // gender: string;

  @ApiPropertyOptional({
    description: 'User status',
    example: UserStatusEnum.LOGGED_IN,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status: string;
  // createdAt: string;
}
