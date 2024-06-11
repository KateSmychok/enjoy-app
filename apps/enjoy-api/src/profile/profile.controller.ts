import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { ChangeActivityStateDto } from './dto/change-activity-state.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '../users/dto/user.dto';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'profile' })
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/me')
  @ApiOperation({ operationId: 'getUser' })
  @ApiResponse({ status: 200, type: UserDto })
  async getUser(): Promise<UserDto> {
    return this.profileService.getUserProfile();
  }

  @Patch('/state')
  @ApiOperation({ operationId: 'change activity state' })
  @ApiResponse({ status: 200 })
  async changeActivityState(@Body() body: ChangeActivityStateDto) {
    return this.profileService.changeActivityState(body);
  }
}
