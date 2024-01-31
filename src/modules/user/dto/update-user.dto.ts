import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRoleEnum, UserStatusEnum } from 'src/constants';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User role',
    example: 'user',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: string;

  @ApiPropertyOptional({
    description: 'User status',
    example: UserStatusEnum.LOGGED_IN,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status: string;
}
