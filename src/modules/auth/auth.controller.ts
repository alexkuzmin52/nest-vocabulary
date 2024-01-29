import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './dto';
import { UserLoginDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<object> {
    return await this.authService.register(userRegisterDto);
  }

  @Get('confirm/:confirmToken')
  @ApiOperation({
    summary: 'Confirmation of registration',
  })
  async confirmUser(
    @Param('confirmToken') confirmToken: string,
  ): Promise<object> {
    return await this.authService.confirm(confirmToken);
  }

  // @ApiSecurity('access-key')
  @Post('login')
  @ApiOperation({
    summary: 'User login',
  })
  async userLogin(@Body() userLoginDto: UserLoginDto): Promise<object> {
    return await this.authService.login(userLoginDto);
  }

  @ApiSecurity('access-key')
  @Get('block/:id')
  @ApiOperation({
    summary: 'Block user',
  })
  async blockUser(@Param('id') userId: string): Promise<{ message: string }> {
    return await this.authService.block(userId);
  }

  @ApiSecurity('access-key')
  @Get('unblock/:id')
  @ApiOperation({
    summary: 'Unblock user',
  })
  async unblockUser(@Param('id') userId: string): Promise<{ message: string }> {
    return await this.authService.unblock(userId);
  }
}
