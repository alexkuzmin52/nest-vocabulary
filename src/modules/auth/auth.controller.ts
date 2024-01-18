import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from "./dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
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
  async userLogin(
    @Body() userLoginDto: UserLoginDto, ): Promise<object> {
    return await this.authService.login(userLoginDto);
  }
    
}
