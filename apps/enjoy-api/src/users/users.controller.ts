import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../entities/User';
import { UserDto } from './dto/user.dto';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'users' })
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/')
  @ApiOperation({ operationId: 'getAllUsers' })
  @ApiResponse({ status: 200, type: [UserDto] })
  async getAllUsers(): Promise<UserDto[]> {
    return this.usersService.getAllUsers();
  }

  @Get('/:email')
  @ApiOperation({ operationId: 'getUserByEmail' })
  @ApiResponse({ status: 200, type: User })
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.getUserByEmail(email);
  }
}
