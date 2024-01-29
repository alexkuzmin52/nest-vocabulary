import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserRoleGuard } from '../../decorators/user-role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoleEnum } from '../../constants';
import { UserService } from './user.service';
import { IUser } from './dto';
import { UserQueryFilterDto } from './dto/user-query-filter.dto';
import { User } from './schemas/user.schema';

@ApiTags('Users')
@ApiSecurity('access-key')
@Roles(UserRoleEnum.ADMIN)
@UseGuards(UserRoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Cet all users' })
  @Get('')
  @ApiOkResponse({ type: [User], description: 'All users' })
  async getUsers(): Promise<IUser[]> {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Cet some user by his Id' })
  @ApiOkResponse({
    type: User,
    description: 'Found user with a specific ID',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<IUser> {
    return await this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get users by filter' })
  @ApiOkResponse({ type: [User], description: 'All users by filter' })
  @Get('filter/query')
  async getFilteredUsers(
    @Query() filter: UserQueryFilterDto,
  ): Promise<IUser[]> {
    // console.log(
    //   'userQueryFilterDto ********************************************',
    //   filter,
    // );
    return await this.userService.getUsersByFilter(filter);
  }

  // @ApiOperation({ summary: 'Update user'})
  // @Put('/:id')
  //   async updateUser(@Param('id') userId: string, @Body() updateUserDto:UpdateUserDto): Promise<IUser> {
  //     return await this.userService.updateUserRoleStatus(updateUserDto, userId);
  // }
}
