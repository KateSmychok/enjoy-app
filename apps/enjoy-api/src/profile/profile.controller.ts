import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { ProcessBookDto } from './dto/process-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {UserDto} from "../users/dto/user.dto";

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

  @Patch('/books')
  @ApiOperation({ operationId: 'processBook' })
  @ApiResponse({ status: 200 })
  async processBook(@Body() body: ProcessBookDto) {
    return this.profileService.processBook(body);
  }
}
