import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserType } from './schemas/user.schema';
import { Model } from "mongoose";
import { UserRegisterDto } from "../auth/dto/user-register.dto";
import { IUser } from "./dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserType>) {}

  async registerUser(userReigsterDto: UserRegisterDto): Promise<IUser> {
    const registeredUser = await new this.userModel(userReigsterDto);
    return registeredUser.save();

  }

  async updateUser(userId: string, update: Partial<IUser>): Promise<IUser> {
    return await this.userModel
      .findByIdAndUpdate(userId, update, { new: true })
      .exec();
  }
  
  async findUserByEmail (email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email }).exec();
    console.log(user);
    return user;
  }
  
}
