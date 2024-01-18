import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserStatusEnum } from '../../constants';
import { IAuth, UserLoginDto } from './dto';
import { IUser } from '../user/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthType } from './schemas/auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  // @ts-ignore
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthType>,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(userRegisterDto: UserRegisterDto): Promise<object> {
    const hashedPassword = await bcrypt.hash(userRegisterDto.password, 10);
    const registeredUser = await this.userService.registerUser({
      ...userRegisterDto,
      password: hashedPassword,
    });
    console.log(registeredUser);

    const confirmToken = this.jwtService.sign(
      {
        _id: registeredUser._id,
        email: registeredUser.email,
        role: registeredUser.role,
      },
      {
        secret: this.configService.get('JWT_CONFIRM_EMAIL_SECRET'),
        expiresIn: this.configService.get('JWT_CONFIRM_EMAIL_LIFETIME'),
      },
    );
    return {
      message: 'Confirm your register : ',
      confirmReference: `confirm/${confirmToken}`,
    };
  }

  async confirm(confirmToken: string): Promise<object> {
    console.log(confirmToken);
    const payload = await this.jwtService.verify(confirmToken, {
      secret: this.configService.get('JWT_CONFIRM_EMAIL_SECRET'),
    });
    const confirmedUser = await this.userService.updateUser(payload['_id'], {
      status: UserStatusEnum.CONFIRMED,
    });
    console.log(confirmedUser);
    return { message: 'Registration successfully confirmed. Please login' };
  }

  async login(userLoginDto: UserLoginDto): Promise<Partial<IAuth>> {
    const { email, password } = userLoginDto;
    const userByEmail = await this.userService.findUserByEmail(email);

    if (
      !userByEmail ||
      (userByEmail.status !== UserStatusEnum.CONFIRMED &&
        userByEmail.status !== UserStatusEnum.LOGGED_OUT)
    ) {
      throw new UnauthorizedException();
    }
    // console.log(userByEmail);
    const isValidPassword = await bcrypt.compare(
      password,
      userByEmail.password,
    );
    // console.log('isValidPassword-------------------', isValidPassword);
    if (!isValidPassword) throw new UnauthorizedException();

    this.userService.updateUser(userByEmail._id, {
      status: UserStatusEnum.LOGGED_IN,
    });

    const tokensPair = await this.createTokensPair(userByEmail);

    const newAuthModel = new this.authModel({
      userId: userByEmail._id,
      access_token: tokensPair.access_token,
      refresh_token: tokensPair.refresh_token,
    });
    await newAuthModel.save();
    return tokensPair;
  }

  async createTokensPair(user: IUser): Promise<Partial<IAuth>> {
    const payload = {
      email: user.email,
      _id: user._id,
      role: user.role,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_SECRET_LIFETIME'),
    });
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_SECRET_LIFETIME'),
    });

    return { access_token, refresh_token };
  }

  async checkIsValidToken(_id: string, token: string): Promise<void> {
    const isValidToken = await this.authModel.findOne({
      userId: _id,
      access_token: token,
    });

    if (!isValidToken) throw new UnauthorizedException();
  }
}
