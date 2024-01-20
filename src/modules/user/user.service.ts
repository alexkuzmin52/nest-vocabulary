import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserType } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserRegisterDto } from '../auth/dto';
import { IUser } from './dto';
import { UserQueryFilterDto } from './dto/user-query-filter.dto';
import { UserStatusEnum } from 'src/constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserType>) {}

  async registerUser(userRegisterDto: UserRegisterDto): Promise<IUser> {
    const registeredUser = new this.userModel(userRegisterDto);
    return registeredUser.save();
  }

  async updateUser(userId: string, update: Partial<IUser>): Promise<IUser> {
    return await this.userModel
      .findByIdAndUpdate(userId, update, { new: true })
      .exec();
  }

  async findUserByEmail(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email }).exec();
    console.log(user);
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<IUser> {
    const userById = await this.userModel.findById(id).exec();
    if (!userById) throw new NotFoundException();
    return userById;
  }

  async getUsersByFilter(query: UserQueryFilterDto): Promise<IUser[]> {
    const usersByFilter = await this.userModel.find(query).exec();
    console.log(usersByFilter);
    return usersByFilter;
  }

  // async updateUserRoleStatus(update: UpdateUserDto, userId: string): Promise<IUser> {
  //   console.log('userId', userId);
  //   console.log('update', update);
  //   const updatedUser = await this.userModel.findByIdAndUpdate(userId, update, { new: true }).exec();
  //   console.log(updatedUser);
  //   return updatedUser;
  // }

  async blockUserById(userId: string): Promise<IUser> {
    const blockedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { status: UserStatusEnum.BLOCKED },
      { new: true },
    );
    console.log(blockedUser);
    return blockedUser;
  }

  async unBlockUserById(userId: string) {
    const unblockedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { status: UserStatusEnum.LOGGED_OUT },
      { new: true },
    );
    console.log(unblockedUser);
    return unblockedUser;
  }
}
